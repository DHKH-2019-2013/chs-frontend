import React, { useEffect, useState } from "react";
import { Chessman } from "../../entities/chessman/chessman";
import { ChessmanComponent } from "../chessman/chessman.component";
import { BoardProps } from "./board.component.i";

export default function BoardComponent({ board }: BoardProps) {
  const [change, setChange] = useState(false);

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
      console.log(movePointContainer);
      for (const point of movePointContainer) {
        document.getElementById(point).parentNode.querySelector(".move-point").classList.add("active");
      }
    }
  }

  function unHightlightSelectedCell() {
    document.querySelector(".selected")?.classList.remove("selected");
  }

  function unHightlightMovePoint() {
    document.querySelectorAll(".active").forEach((elem) => {
      elem.classList.remove("active");
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
