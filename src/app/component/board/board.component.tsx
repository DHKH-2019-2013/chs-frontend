import React, { useEffect, useState } from "react";
import { Chessman } from "../../entities/chessman/chessman";
import { ChessmanComponent } from "../chessman/chessman.component";
import { BoardProps } from "./board.component.i";

export default function BoardComponent({ board }: BoardProps) {
  const [change, setChange] = useState(false);

  useEffect(() => {}, [change]);

  function moveChessman(event: any, currentPos: string) {
    try {
      // get next chessman position
      const nextPos = document.elementFromPoint(event.clientX, event.clientY).id;

      // check if next position is same with previous
      if (nextPos === currentPos) throw new Error("samePosition");

      // update chessman position by swapping
      const temp = board[nextPos].object;
      board[nextPos].object = board[currentPos].object;
      board[currentPos].object = temp;

      // trigger board re-render
      setChange(!change);
    } catch (e) {
      // do nothing
    }
  }

  return (
    <>
      <div id="board-container">
        <img id="board" src="assets/board.png" alt="chess-board" />
        {Object.keys(board).map((key) => {
          return <ChessmanComponent key={key} data={board[key]} currentPos={key} moveChessman={moveChessman} />;
        })}
      </div>
    </>
  );
}
