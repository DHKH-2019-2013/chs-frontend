import React from "react";
import { ChessmanProps } from "./chessman.component.i";

export function ChessmanComponent({
  data,
  currentPos,
  moveChessman,
  hightlightSelectedCell,
  unHightlightSelectedCellWhenDrop,
}: ChessmanProps) {
  function getMove() {
    // const board = new Board().getData();
    // const moveContainer = board[currentPos]?.object?.move(board, currentPos);
    return;
  }

  function disableNotAllowedMouseCursor(event: any) {
    event.preventDefault();
  }

  function hideCurrentChessmanWhenClick(event: any) {
    hightlightSelectedCell(event);
    if (event.target.src.includes("empty")) event.preventDefault();
  }

  function hightlightPointer(event: any) {
    event.target.classList.add("pointing");
  }

  function unHightlightPointer(event: any) {
    if (event.type === "drop") unHightlightSelectedCellWhenDrop();
    event.target.classList.remove("pointing");
  }

  return (
    <div className="chessman-container" style={{ top: data?.y, left: data?.x }}>
      <img
        id={currentPos}
        className="chessman"
        src={data?.object?.get().imageUrl}
        onDragStart={hideCurrentChessmanWhenClick}
        onDragEnd={(e) => moveChessman(e, currentPos)}
        onDragEnter={hightlightPointer}
        onDragLeave={unHightlightPointer}
        onDrop={unHightlightPointer}
        onDragOver={disableNotAllowedMouseCursor}
        onClick={(event) => hightlightSelectedCell(event)}
      ></img>
    </div>
  );
}
