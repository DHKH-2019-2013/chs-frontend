import React, { useEffect, useRef, useState } from "react";
import {
  CheckValidMoveParams,
  CheckValidMoveResponse,
  GetBotMoveParams,
  GetBotMoveResponse,
} from "../../config/http-rest-client-config/http-rest-client-config.i";
import { HttpRestClientConfig } from "../../config/http-rest-client-config/http-rest-client.config";
import { sendPlayerMove } from "../../config/socket-client-config/socket-client-config";
import { CHESSMAN_ASSET_URL, GameMode, INTELIGENCE } from "../../constant/constant";
import { Chessman } from "../../entities/chessman/chessman";
import { socket } from "../../service/socket/socket.service";
import { sendMessageInBotRoom } from "../bot-settings-bar/bot-settings-bar.component";
import ChessmanComponent from "../chessman/chessman.component";
import {
  BoardHistories,
  BoardProps,
  CastlingResult,
  IncomingHistory,
  ListenUpdateMoveParams,
  PlayerMoveInfo,
  PromotionResult,
} from "./board.component.i";
import PromotionBoardComponent from "../promotion-board/promotion-board.component";
import { Rider } from "../../entities/chessman/rider/rider";
import { Knight } from "../../entities/chessman/knight/knight";
import { Bishop } from "../../entities/chessman/bishop/bishop";
import { Queen } from "../../entities/chessman/queen/queen";
import { Pawn } from "../../entities/chessman/pawn/pawn";

export default function BoardComponent({
  roomId,
  board,
  getBoardFen,
  setBoardFen,
  side,
  gameMode,
  historyCommand,
  reRenderBoard,
}: BoardProps) {
  const histories = useRef<BoardHistories>([
    {
      fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
      isCheckmate: false,
      isBotCheckmate: false,
      move: undefined,
    },
  ]);
  const historyPoiter = useRef<number>(0);
  const [change, setChange] = useState(1);
  const [playerMove, setPlayerMove] = useState<PlayerMoveInfo>({ move: "", isCheckmate: false });
  const [promotionSide, setPromotionSide] = useState(true);
  const [promotionMovePositionInfo, setPromotionMovePositionInfo] = useState("");

  useEffect(() => {
    socket.on("listen-update-move", ({ fen, move, isCheckmate, promotionUnit }: ListenUpdateMoveParams) => {
      moveChessmanByAnotherPlayer({ fen, move, isCheckmate, promotionUnit });
    });
  }, []);

  useEffect(() => {}, [side]);

  useEffect(() => {
    (async () => {
      if (playerMove?.move) {
        switch (gameMode) {
          case GameMode.PVP: {
            sendPlayerMove(
              roomId,
              getBoardFen(),
              playerMove.move,
              playerMove.isCheckmate,
              playerMove.promotionUnit
            );
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

  useEffect(() => {
    // when move, clear checkmate
    if (historyCommand) {
      switch (historyCommand.type) {
        case "prev": {
          historyPoiter.current - 1 >= 0 && (historyPoiter.current = historyPoiter.current - 1);
          reRenderBoard(histories.current[historyPoiter.current].fen);
          toggleCheckmate(
            histories.current[historyPoiter.current].isCheckmate,
            histories.current[historyPoiter.current].isBotCheckmate
          );
          sendMessageInBotRoom("move back", true);
          forceUpdate();
          break;
        }
        case "next": {
          let temp = [...histories.current, {} as any] as BoardHistories;
          historyPoiter.current + 1 < temp.length - 1 && (historyPoiter.current = historyPoiter.current + 1);
          reRenderBoard(temp[historyPoiter.current].fen);
          toggleCheckmate(temp[historyPoiter.current].isCheckmate, temp[historyPoiter.current].isBotCheckmate);
          sendMessageInBotRoom("move next", true);
          forceUpdate();
          break;
        }
      }
    }
  }, [historyCommand]);

  useEffect(() => {
    const $prevButton = document.querySelector("#prev-move-button");
    const $nextButton = document.querySelector("#next-move-button");

    if (histories.current.length === 1) {
      $prevButton.setAttribute("disabled", "");
      $nextButton.setAttribute("disabled", "");
    } else {
      if (historyPoiter.current === histories.current.length - 1) {
        $prevButton.removeAttribute("disabled");
        $nextButton.setAttribute("disabled", "");
      } else if (historyPoiter.current === 0) {
        $prevButton.setAttribute("disabled", "");
        $nextButton.removeAttribute("disabled");
      } else {
        $prevButton.removeAttribute("disabled");
        $nextButton.removeAttribute("disabled");
      }
    }
  }, [histories.current, historyCommand]);

  // move functions
  function forceUpdate() {
    setChange(change + Math.random() * 1);
  }

  function handleCastling(currentPos: string, nextPos: string): CastlingResult {
    if (["K", "k"].includes(board[currentPos].object.get().code)) {
      if (currentPos === "e8" && (nextPos === "g8" || nextPos === "h8")) {
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
      } else if (currentPos === "e8" && (nextPos === "c8" || nextPos === "a8")) {
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
      } else if (currentPos === "e1" && (nextPos === "g1" || nextPos === "h1")) {
        return {
          isCastling: true,
          king: {
            currentPos: "e1",
            nextPos: "g1",
          },
          rider: {
            currentPos: "h1",
            nextPos: "f1",
          },
        };
      } else if (currentPos === "e1" && (nextPos === "c1" || nextPos === "a1")) {
        return {
          isCastling: true,
          king: {
            currentPos: "e1",
            nextPos: "c1",
          },
          rider: {
            currentPos: "a1",
            nextPos: "d1",
          },
        };
      }
    }

    return { isCastling: false };
  }

  async function handlePromotion(event: any) {
    try {
      const [currentPos, nextPos] = promotionMovePositionInfo.split(" ");
      const promotionUnit = event.target.parentNode.className;

      // check if next move is valid
      const params: CheckValidMoveParams = {
        fen: getBoardFen(),
        move: currentPos + nextPos + promotionUnit,
      };
      const result: CheckValidMoveResponse = await HttpRestClientConfig.checkValidMove(params);
      if (!result.isValidMove) return;

      updateBoardChessman(nextPos, nextPos, promotionUnit);

      setBoardFen(result.fen);

      // final
      // trigger board re-render
      forceUpdate();

      // disable player mouse
      displayPromotionBoard(false);
      toggleDisableMoveCursor(true);
      toggleCheckmate(result.isCheckmate);

      // update player move
      const playerMoveInfo: PlayerMoveInfo = {
        move: currentPos + nextPos,
        isCheckmate: result.isCheckmate,
        promotionUnit: promotionUnit,
      };
      setPlayerMove(playerMoveInfo);

      // send notification
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

  function isPromotion(currentPos: string, nextPos: string): PromotionResult {
    const code = board[currentPos].object.get().code;
    if (code === "P" || code === "p") {
      switch (nextPos[1]) {
        case "8": {
          setPromotionSide(true);
          return {
            isPromotion: true,
          };
        }
        case "1": {
          setPromotionSide(false);
          return {
            isPromotion: true,
          };
        }
        default: {
          return {
            isPromotion: false,
          };
        }
      }
    } else
      return {
        isPromotion: false,
      };
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
    return board[currentPos]?.object?.move(
      board,
      currentPos,
      histories.current.filter((history) => history.move).map((history) => history.move)
    );
  }

  function updateBoardChessman(
    currentPos: string,
    nextPos: string,
    promotionUnit?: string,
    incomingHistory?: IncomingHistory
  ) {
    // update chessman position by swapping
    board[nextPos].object = board[currentPos].object;
    if (promotionUnit) {
      const currentInfo = board[currentPos].object.get();
      const newCode = currentInfo.side ? `${promotionUnit.toUpperCase()}` : `${promotionUnit.toLowerCase()}`;
      const promotionUnitUrl = Object.values(CHESSMAN_ASSET_URL).find((e) => e.includes(`${newCode}.png`));

      switch (newCode.toLowerCase()) {
        case "r": {
          board[nextPos].object = new Rider(promotionUnitUrl, currentInfo.side, newCode);
          break;
        }
        case "n": {
          board[nextPos].object = new Knight(promotionUnitUrl, currentInfo.side, newCode);
          break;
        }
        case "b": {
          board[nextPos].object = new Bishop(promotionUnitUrl, currentInfo.side, newCode);
          break;
        }
        case "q": {
          board[nextPos].object = new Queen(promotionUnitUrl, currentInfo.side, newCode);
          break;
        }
        case "p": {
          board[nextPos].object = new Pawn(promotionUnitUrl, currentInfo.side, newCode);
          break;
        }
      }
    }

    if (currentPos !== nextPos) board[currentPos].object = new Chessman("assets/empty.png", undefined, undefined);

    setBoardHistory(incomingHistory, currentPos + nextPos);
  }

  async function moveChessmanByAnotherPlayer(anotherPlayerMove: ListenUpdateMoveParams) {
    setBoardFen(anotherPlayerMove.fen);

    const currentPos = anotherPlayerMove.move.slice(0, 2);
    const nextPos = anotherPlayerMove.move.slice(2, 4);

    // handle castle
    const _castlingResult: CastlingResult = handleCastling(currentPos, nextPos);
    if (_castlingResult.isCastling) {
      updateBoardChessman(_castlingResult.king.currentPos, _castlingResult.king.nextPos, undefined, {
        fen: anotherPlayerMove.fen,
        isCheckmate: anotherPlayerMove.isCheckmate,
        isBotCheckmate: false,
      });
      updateBoardChessman(_castlingResult.rider.currentPos, _castlingResult.rider.nextPos, undefined, {
        fen: anotherPlayerMove.fen,
        isCheckmate: anotherPlayerMove.isCheckmate,
        isBotCheckmate: false,
      });
    } else
      updateBoardChessman(currentPos, nextPos, anotherPlayerMove.promotionUnit, {
        fen: anotherPlayerMove.fen,
        isCheckmate: anotherPlayerMove.isCheckmate,
        isBotCheckmate: false,
      });

    // trigger board re-render
    forceUpdate();
    toggleDisableMoveCursor(false);
    toggleCheckmate(anotherPlayerMove.isCheckmate);
  }

  async function moveChessmanByBot(playerMove: PlayerMoveInfo) {
    const difficulty = (
      document.querySelector(
        "#bot-settings-bar #bot-settings-bar-difficulty #difficulty-list button.difficulty-active"
      ) as HTMLElement
    ).getAttribute("data-intelligence");
    const params: GetBotMoveParams = {
      fen: getBoardFen(),
      move: playerMove.move + (playerMove.promotionUnit ?? ""),
      int: difficulty ?? String(INTELIGENCE),
    };
    const response: GetBotMoveResponse = await HttpRestClientConfig.getBotMove(params);

    const currentPos = response.move.slice(0, 2);
    const nextPos = response.move.slice(2, 4);
    const promotionUnit = response.move.slice(4, 5);

    // handle castle
    const _castlingResult: CastlingResult = handleCastling(currentPos, nextPos);
    if (_castlingResult.isCastling) {
      updateBoardChessman(_castlingResult.king.currentPos, _castlingResult.king.nextPos, undefined, {
        fen: response.fen,
        isCheckmate: response.isCheckmate,
        isBotCheckmate: true,
      });
      updateBoardChessman(_castlingResult.rider.currentPos, _castlingResult.rider.nextPos, undefined, {
        fen: response.fen,
        isCheckmate: response.isCheckmate,
        isBotCheckmate: true,
      });
    } else
      updateBoardChessman(currentPos, nextPos, promotionUnit, {
        fen: response.fen,
        isCheckmate: response.isCheckmate,
        isBotCheckmate: true,
      });

    // trigger board re-render
    setBoardFen(response.fen);
    forceUpdate();
    sendMessageInBotRoom(`bot move from ${currentPos} to ${nextPos}`, false);
    toggleDisableMoveCursor(false);
    toggleCheckmate(response.isCheckmate, true);
    isGameOver(response.isGameOver, "bot");
  }

  async function moveChessmanByPlayer(event: any, currentPos: string) {
    try {
      // get next chessman position
      const nextPos = document.elementFromPoint(event.clientX, event.clientY).id;

      // check if next position is same with previous
      if (nextPos === currentPos) throw new Error("samePosition");
      // check chessman is my side
      if (board[currentPos].object?.get().side !== side) throw new Error("Not your chessman");

      // handle promotion
      const _promotionResult: PromotionResult = isPromotion(currentPos, nextPos);
      if (_promotionResult.isPromotion) {
        updateBoardChessman(currentPos, nextPos);
        setPromotionMovePositionInfo(`${currentPos} ${nextPos}`);
        displayPromotionBoard(true);
        forceUpdate();
        return;
      }

      // check if next move is valid
      const params: CheckValidMoveParams = {
        fen: getBoardFen(),
        move: currentPos + nextPos,
      };
      const result: CheckValidMoveResponse = await HttpRestClientConfig.checkValidMove(params);
      if (!result.isValidMove) return;

      // handle castle
      const _castlingResult: CastlingResult = handleCastling(currentPos, nextPos);
      if (_castlingResult.isCastling) {
        updateBoardChessman(_castlingResult.king.currentPos, _castlingResult.king.nextPos, undefined, {
          fen: result.fen,
          isCheckmate: result.isCheckmate,
          isBotCheckmate: false,
        });
        updateBoardChessman(_castlingResult.rider.currentPos, _castlingResult.rider.nextPos, undefined, {
          fen: result.fen,
          isCheckmate: result.isCheckmate,
          isBotCheckmate: false,
        });
      } else
        updateBoardChessman(currentPos, nextPos, undefined, {
          fen: result.fen,
          isCheckmate: result.isCheckmate,
          isBotCheckmate: false,
        });

      setBoardFen(result.fen);
      // final
      // trigger board re-render
      forceUpdate();

      // disable player mouse cursor
      toggleDisableMoveCursor(true);
      toggleCheckmate(result.isCheckmate);

      // update player move
      const playerMoveInfo: PlayerMoveInfo = {
        move: currentPos + nextPos,
        isCheckmate: result.isCheckmate,
      };
      setPlayerMove(playerMoveInfo);

      // send notification
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

  function setBoardHistory(incomingHistory: IncomingHistory, nextMove: string) {
    histories.current = [
      ...histories.current.slice(0, historyPoiter.current + 1),
      {
        fen: incomingHistory.fen,
        isCheckmate: incomingHistory.isCheckmate,
        isBotCheckmate: incomingHistory.isBotCheckmate,
        move: nextMove,
      },
    ];
    historyPoiter.current = histories.current.length - 1;
  }

  // style functions
  function highLightSelectedCell(event: any) {
    if (event.target.src.includes("empty")) {
      event.preventDefault();
      return;
    }

    if (event.type === "click") {
      if (document.querySelector(".selected img")?.id !== event.target.id) unHighLightSelectedCell();
      event.target.parentNode.classList.toggle("selected");
    }
    if (event.type === "dragstart") event.target.parentNode.classList.add("selected");

    displayChessmanMovePoint(event);
  }

  function displayChessmanMovePoint(event: any) {
    // remove previous move point
    unHighLightMovePoint();

    // set new move point
    if (event.target.parentNode.classList.contains("selected")) {
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

  function displayPromotionBoard(onPromotion: boolean) {
    if (!side) {
      const $promotionBoard = document.querySelector("#board-container #promotion-board-container") as HTMLElement;
      $promotionBoard.classList.add("invert");
    }

    document.getElementById("promotion-board-container").style.display = onPromotion ? "block" : "none";
  }

  function unHighLightSelectedCell() {
    document.querySelector(".selected")?.classList.remove("selected");
  }

  function unHighLightMovePoint() {
    document.querySelectorAll(".move-point.active, .active-enemy").forEach((elem) => {
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

  function toggleCheckmate(isCheckmate: boolean, isBotCheckMate: boolean = false) {
    if (isCheckmate) {
      const fen = getBoardFen();
      let code = "";
      switch (gameMode) {
        case GameMode.PVP: {
          code = fen.search(" b ") > -1 ? "_k" : "K";
          break;
        }
        case GameMode.PVE: {
          code = isBotCheckMate ? "K" : "_k";
          break;
        }
      }
      (document.querySelector(`img[src='assets/${code}.png']`).parentNode as HTMLElement).classList.add(
        "is-check-mate"
      );
    } else {
      document
        .querySelectorAll("img[src='assets/K.png'], img[src='assets/_k.png']")
        .forEach((king) => (king.parentNode as HTMLElement).classList.remove("is-check-mate"));
    }
  }

  return (
    <div id="board-container">
      <PromotionBoardComponent handlePromotion={handlePromotion} side={promotionSide} />
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
