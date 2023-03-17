import React from "react";
import { ChessmanProps } from "./chessman.component.i";

export function ChessmanComponent({ data, currentPos, handleDragEnd }: ChessmanProps) {
  function getMove () {
    // const board = new Board().getData();
    // const moveContainer = board[currentPos]?.object?.move(board, currentPos);
    return;
  }

  return (
    <>
      <img
        id={currentPos}
        className="chessman"
        src={data?.object?.get().imageUrl}
        style={{ top: data?.y, left: data?.x }}

        onDragEnd={(e) => handleDragEnd(e, currentPos)}
      ></img>
    </>
  )
}