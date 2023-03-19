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
    board[currentPos].object = new Chessman("assets/empty.png");
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

  function hightlightSelectedCell(event: any) {
    if (event.target.src.includes("empty")) {
      event.preventDefault();
      return;
    }

    if (event.type === "click") event.target.classList.toggle("selected");
    if (event.type === "dragstart") event.target.classList.add("selected");
  }

  function unHightlightSelectedCellWhenDrop() {
    document.querySelector(".selected")?.classList.remove("selected");
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
              unHightlightSelectedCellWhenDrop={unHightlightSelectedCellWhenDrop}
            />
          );
        })}
      </div>
    </>
  );
}
