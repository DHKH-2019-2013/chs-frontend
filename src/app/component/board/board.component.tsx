import React, { useEffect, useState } from "react";
import { GetInitializeChessBoardResponse } from "../../config/http-rest-client-config/http-rest-client-config.i";
import { HttpRestClientConfig } from "../../config/http-rest-client-config/http-rest-client.config";
import { Chessman } from "../../entities/chessman/chessman";
import { ChessmanComponent } from "../chessman/chessman.component";
import { BoardProps } from "./board.component.i";

export default function BoardComponent({ board, updateBoardFen }: BoardProps) {
  const [change, setChange] = useState(false);

  useEffect(() => {
    (async () => {
      const response: GetInitializeChessBoardResponse = await HttpRestClientConfig.getInitializeChessBoard();
      updateBoardFen(response.fen);
    })();
  });

  useEffect(() => {}, [change]);

  function handleBoardUpdate(currentPos: string, nextPos: string) {
    // check if next position is same with previous
    if (nextPos === currentPos) return new Error("samePosition");

    // update chessman position by swapping
    board[nextPos].object = board[currentPos].object;
    board[currentPos].object = new Chessman("assets/empty.png", undefined, undefined);
  }

  function moveChessman(event: any, currentPos: string) {
    try {
      // get next chessman position
      const nextPos = document.elementFromPoint(event.clientX, event.clientY).id;

      // handle board update
      handleBoardUpdate(currentPos, nextPos);

      // trigger board re-render
      setChange(!change);
    } catch (e) {
      // do nothing
    }
  }

  function getChessmanMove(currentPos: string) {
    return board[currentPos]?.object?.move(board, currentPos);
  }

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
              moveChessman={moveChessman}
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
