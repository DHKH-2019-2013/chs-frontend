import React, { useEffect, useState } from "react";
import {
  CheckValidMoveParams,
  CheckValidMoveResponse,
  GetBotMoveParams,
  GetBotMoveResponse,
} from "../../config/http-rest-client-config/http-rest-client-config.i";
import { HttpRestClientConfig } from "../../config/http-rest-client-config/http-rest-client.config";
import { sendPlayerMove } from "../../config/socket-client-config/socket-client-config";
import { GameMode, INTELIGENCE } from "../../constant/constant";
import { Chessman } from "../../entities/chessman/chessman";
import { socket } from "../../service/socket/socket.service";
import { sendMessageInBotRoom } from "../bot-settings-bar/bot-settings-bar.component";
import ChessmanComponent from "../chessman/chessman.component";
import { BoardProps, CastlingResult, ListenUpdateMoveParams, PlayerMoveInfo } from "./board.component.i";

export default function BoardComponent({
  roomId,
  board,
  getBoardFen,
  setBoardFen,
  side,
  getSide,
  gameMode,
}: BoardProps) {
  const [change, setChange] = useState(1);
  const [playerMove, setPlayerMove] = useState<PlayerMoveInfo>({ move: "", isCheckmate: false });

  useEffect(() => {
    socket.on("listen-update-move", ({ fen, move, isCheckmate }: ListenUpdateMoveParams) => {
      moveChessmanByAnotherPlayer({ fen, move, isCheckmate });
    });
  }, []);

  useEffect(() => {
    (async () => {
      if (playerMove?.move) {
        switch (gameMode) {
          case GameMode.PVP: {
            // implement
            sendPlayerMove(roomId, getBoardFen(), playerMove.move, playerMove.isCheckmate);
            break;
          }
          case GameMode.PVE: {
            await moveChessmanByBot(playerMove);
            break;
          }
        }
      }
    })();
  }, [playerMove]);

  // move functions
  function forceUpdate() {
    setChange(change + Math.random() * 1);
  }

  function handleBotCastling(currentPos: string, nextPos: string): CastlingResult {
    if (["K", "k"].includes(board[currentPos].object.get().code)) {
      if (currentPos === "e8" && nextPos === "g8") {
        return {
          isCastling: true,
          king: {
            currentPos: "e8",
            nextPos: "g8",
          },
          rider: {
            currentPos: "h8",
            nextPos: "f8",
          },
        };
      } else if (currentPos === "e8" && nextPos === "c8") {
        return {
          isCastling: true,
          king: {
            currentPos: "e8",
            nextPos: "c8",
          },
          rider: {
            currentPos: "a8",
            nextPos: "d8",
          },
        };
      }
    }

    return { isCastling: false };
  }

  function isGameOver(isGameOver: boolean, object: string) {
    if (isGameOver) {
      switch (object) {
        case "you": {
          console.log("you win");
          break;
        }
        case "bot": {
          sendMessageInBotRoom("You lose", false);
          break;
        }
      }
    }
  }

  function getChessmanMove(currentPos: string) {
    return board[currentPos]?.object?.move(board, currentPos);
  }

  function updateBoardChessman(currentPos: string, nextPos: string) {
    // update chessman position by swapping
    board[nextPos].object = board[currentPos].object;
    board[currentPos].object = new Chessman("assets/empty.png", undefined, undefined);
  }

  async function moveChessmanByAnotherPlayer(anotherPlayerMove: ListenUpdateMoveParams) {
    setBoardFen(anotherPlayerMove.fen);

    const currentPos = anotherPlayerMove.move.slice(0, 2);
    const nextPos = anotherPlayerMove.move.slice(2, 4);
    updateBoardChessman(currentPos, nextPos);

    // trigger board re-render
    forceUpdate();
    toggleDisableMoveCursor(false);
    toggleCheckmate(anotherPlayerMove.isCheckmate);
  }

  async function moveChessmanByBot(playerMove: PlayerMoveInfo) {
    const params: GetBotMoveParams = {
      fen: getBoardFen(),
      move: playerMove.move,
      int: String(INTELIGENCE),
    };
    const response: GetBotMoveResponse = await HttpRestClientConfig.getBotMove(params);

    setBoardFen(response.fen);
    const currentPos = response.move.slice(0, 2);
    const nextPos = response.move.slice(2, 4);

    // handle castle
    const _result: CastlingResult = handleBotCastling(currentPos, nextPos);
    if (_result.isCastling) {
      updateBoardChessman(_result.king.currentPos, _result.king.nextPos);
      updateBoardChessman(_result.rider.currentPos, _result.rider.nextPos);
    } else updateBoardChessman(currentPos, nextPos);

    // trigger board re-render
    forceUpdate();
    sendMessageInBotRoom(`bot move from ${currentPos} to ${nextPos}`, false);
    toggleDisableMoveCursor(false);
    toggleCheckmate(response.isCheckmate);
    isGameOver(response.isGameOver, "bot");
  }

  async function moveChessmanByPlayer(event: any, currentPos: string) {
    try {
      // get next chessman position
      const nextPos = document.elementFromPoint(event.clientX, event.clientY).id;

      // check if next position is same with previous
      if (nextPos === currentPos) return new Error("samePosition");
      // check chessman is my side
      if (board[currentPos].object?.get().side !== side) return new Error("Not your chessman");

      // check if next move is valid
      const params: CheckValidMoveParams = {
        fen: getBoardFen(),
        move: currentPos + nextPos,
      };
      const result: CheckValidMoveResponse = await HttpRestClientConfig.checkValidMove(params);
      if (!result.isValidMove) return;

      updateBoardChessman(currentPos, nextPos);
      if (gameMode === GameMode.PVP) setBoardFen(result.fen);

      // final
      // trigger board re-render
      forceUpdate();

      // update player move
      const playerMoveInfo: PlayerMoveInfo = {
        move: currentPos + nextPos,
        isCheckmate: result.isCheckmate,
      };
      setPlayerMove(playerMoveInfo);

      // disable player mouse cursor
      toggleDisableMoveCursor(true);
      toggleCheckmate(result.isCheckmate, true);
      switch (gameMode) {
        case GameMode.PVE: {
          sendMessageInBotRoom(`you move from ${currentPos} to ${nextPos}`, true);
          break;
        }
      }
      isGameOver(result.isGameOver, "you");
    } catch (e) {
      // do nothing
    }
  }

  // style functions
  useEffect(() => {
    document.getElementById("board-container").style.transform = `rotate(${side ? "0deg" : "180deg"})`;
    document.querySelectorAll(".chessman-container").forEach((elem: HTMLElement) => {
      elem.style.transform = `rotate(${side ? "0deg" : "180deg"})`;
    });
  }, [side]);

  function highLightSelectedCell(event: any) {
    if (event.target.src.includes("empty")) {
      event.preventDefault();
      return;
    }

    if (event.type === "click") {
      if (document.querySelector(".selected")?.id !== event.target.id) unHighLightSelectedCell();
      event.target.classList.toggle("selected");
    }
    if (event.type === "dragstart") event.target.classList.add("selected");

    displayChessmanMovePoint(event);
  }

  function displayChessmanMovePoint(event: any) {
    // remove previous move point
    unHighLightMovePoint();

    // set new move point
    if (event.target.classList.contains("selected")) {
      const movePointContainer = getChessmanMove(event.target.id);
      for (const point of movePointContainer) {
        if (
          typeof board[point].object.get().side === "boolean" &&
          board[point].object.get().side !== board[event.target.id].object.get().side
        ) {
          document.getElementById(point).parentNode.querySelector(".move-point").classList.add("active-enemy");
          continue;
        }
        document.getElementById(point).parentNode.querySelector(".move-point").classList.add("active");
      }
    }
  }

  function unHighLightSelectedCell() {
    document.querySelector(".selected")?.classList.remove("selected");
  }

  function unHighLightMovePoint() {
    document.querySelectorAll(".active, .active-enemy").forEach((elem) => {
      elem.classList.remove("active", "active-enemy");
    });
  }

  function toggleDisableMoveCursor(onWait: boolean) {
    const boardCursor = onWait ? "wait" : "initial";
    const chessManCursor = onWait ? "none" : "initial";

    (document.querySelector("#board-container") as HTMLElement).style.cursor = boardCursor;
    document.querySelectorAll(".chessman").forEach((e: any) => {
      e.style.pointerEvents = chessManCursor;
    });
  }

  function toggleCheckmate(isCheckmate: boolean, isYourMove: boolean = false) {
    // there is so many place call this method :(
    let code = "";
    if (isYourMove) code = side ? "_k" : "K";
    else code = side ? "K" : "_k";
    if (isCheckmate) document.querySelector(`img[src='assets/${code}.png']`).classList.add("is-check-mate");
    else {
      document
        .querySelectorAll("img[src='assets/K.png'], img[src='assets/_k.png']")
        .forEach((king) => king.classList.remove("is-check-mate"));
    }
  }

  return (
    <div id="board-container">
      <img id="board" src="assets/board.png" alt="chess-board" />
      {Object.keys(board).map((key) => {
        return (
          <ChessmanComponent
            key={key}
            data={board[key]}
            currentPos={key}
            moveChessmanByPlayer={moveChessmanByPlayer}
            highLightSelectedCell={highLightSelectedCell}
            unHighLightSelectedCell={unHighLightSelectedCell}
            unHighLightMovePoint={unHighLightMovePoint}
          />
        );
      })}
    </div>
  );
}
