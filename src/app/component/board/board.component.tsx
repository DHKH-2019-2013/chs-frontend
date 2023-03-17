import React, { useEffect, useState } from "react";
import { Board } from "../../entities/board/board";
import { ChessmanComponent } from "../chessman/chessman.component";
const board = new Board().getData(); // fix shit
export default function BoardComponent() {
  const [change, setChange] = useState(false);
  

  useEffect(() => {
    console.log("HELLO");
  }, [change])

  function handleDragEnd(event: any, currentPos: string) {
    const nextPos = document.elementFromPoint(event.clientX, event.clientY).id;
    board[nextPos].object = board[currentPos].object;
    board[currentPos].object = undefined;
    console.log(nextPos, board[nextPos]);
    console.log(currentPos, board[currentPos]);

    setChange(!change)
  }

  return (
    <>
      <div id="board-container">
        <img id="board" src="assets/board.png" alt="chess-board" />
        {
          Object.keys(board).map(key => {
            if (key === "a3") console.log(board[key]);
            return <ChessmanComponent key={key} data={board[key]} currentPos={key} handleDragEnd={handleDragEnd}/>
          })
        }
      </div>
    </>
  );
}
