import React, { useEffect, useState } from "react";
import {
  CheckValidMoveParams,
  CheckValidMoveResponse,
  GetMoveParams,
  GetMoveResponse,
} from "../../config/http-rest-client-config/http-rest-client-config.i";
import { HttpRestClientConfig } from "../../config/http-rest-client-config/http-rest-client.config";
import { INTELIGENCE } from "../../constant/constant";
import { Chessman } from "../../entities/chessman/chessman";
import { ChessmanComponent } from "../chessman/chessman.component";
import { BoardProps, CastlingResult } from "./board.component.i";

export default function BoardComponent({ board, getBoardFen, setBoardFen }: BoardProps) {
  const [change, setChange] = useState(false);
  const [playerMoved, setPlayerMoved] = useState("");

  useEffect(() => {}, [change]);

  useEffect(() => {
    (async () => {
      if (playerMoved) {
        await moveChessmanByBot(playerMoved);
      }
    })();
  }, [playerMoved]);

  // move functions
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

  function getChessmanMove(currentPos: string) {
    return board[currentPos]?.object?.move(board, currentPos);
  }

  function updateBoardChessman(currentPos: string, nextPos: string) {
    // update chessman position by swapping
    board[nextPos].object = board[currentPos].object;
    board[currentPos].object = new Chessman("assets/empty.png", undefined, undefined);
  }

  async function moveChessmanByBot(playerMove: string) {
    const params: GetMoveParams = {
      fen: getBoardFen(),
      move: playerMove,
      int: String(INTELIGENCE),
    };
    const response: GetMoveResponse = await HttpRestClientConfig.getMove(params);

    setBoardFen(response.fen);
    const currentPos = response.move.slice(0, 2);
    const nextPos = response.move.slice(2, 4);

    // handle castle
    const _result: CastlingResult = handleBotCastling(currentPos, nextPos);
    if (_result.isCastling) {
      updateBoardChessman(_result.king.currentPos, _result.king.nextPos);
      updateBoardChessman(_result.rider.currentPos, _result.rider.nextPos);
    } else updateBoardChessman(currentPos, nextPos);

    // final
    // trigger board re-render
    setChange(!change);
    // update player move
    setPlayerMoved("");
    // disable player mouse cursor
    document.querySelector("body").style.cursor = "initial";
    document.querySelectorAll(".chessman").forEach((e: any) => {
      e.style.pointerEvents = "initial";
    });
  }

  async function moveChessmanByPlayer(event: any, currentPos: string) {
    try {
      // get next chessman position
      const nextPos = document.elementFromPoint(event.clientX, event.clientY).id;

      // check if next position is same with previous
      if (nextPos === currentPos) return new Error("samePosition");

      // check if next move is valid
      const params: CheckValidMoveParams = {
        fen: getBoardFen(),
        move: currentPos + nextPos,
      };
      const result: CheckValidMoveResponse = await HttpRestClientConfig.checkValidMove(params);
      if (!result.isValidMove) return;

      updateBoardChessman(currentPos, nextPos);

      // final
      // trigger board re-render
      setChange(!change);
      // update player move
      setPlayerMoved(currentPos + nextPos);
      // disable player mouse cursor
      document.querySelector("body").style.cursor = "wait";
      document.querySelectorAll(".chessman").forEach((e: any) => {
        e.style.pointerEvents = "none";
      });
    } catch (e) {
      // do nothing
    }
  }

  // style functions
  function hightlightSelectedCell(event: any) {
    if (event.target.src.includes("empty")) {
      event.preventDefault();
      return;
    }

    if (event.type === "click") {
      if (document.querySelector(".selected")?.id !== event.target.id) unHightlightSelectedCell();
      event.target.classList.toggle("selected");
    }
    if (event.type === "dragstart") event.target.classList.add("selected");

    displayChessmanMovePoint(event);
  }

  function displayChessmanMovePoint(event: any) {
    // remove previous move point
    unHightlightMovePoint();

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

  function unHightlightSelectedCell() {
    document.querySelector(".selected")?.classList.remove("selected");
  }

  function unHightlightMovePoint() {
    document.querySelectorAll(".active, .active-enemy").forEach((elem) => {
      elem.classList.remove("active", "active-enemy");
    });
  }

  return (
    <>
      <div id="board-container">
        <img id="board" src="assets/board.png" alt="chess-board" />
        {Object.keys(board).map((key) => {
          return (
            <ChessmanComponent
              key={key}
              data={board[key]}
              currentPos={key}
              moveChessmanByPlayer={moveChessmanByPlayer}
              hightlightSelectedCell={hightlightSelectedCell}
              unHightlightSelectedCell={unHightlightSelectedCell}
              unHightlightMovePoint={unHightlightMovePoint}
            />
          );
        })}
      </div>
    </>
  );
}
