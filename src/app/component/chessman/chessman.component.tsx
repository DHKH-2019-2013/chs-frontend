import React, { useState } from "react";
import { ChessmanProps } from "./chessman.component.i";

export function ChessmanComponent({ data, currentPos, moveChessman }: ChessmanProps) {
  const [isSelected, setSelected] = useState(true);

  function getMove() {
    // const board = new Board().getData();
    // const moveContainer = board[currentPos]?.object?.move(board, currentPos);
    return;
  }

  function disableNotAllowedMouseCursor(event: any) {
    event.preventDefault();
  }

  function hideCurrentChessmanWhenClick(event: any) {
    if (event.target.src.includes("empty")) event.preventDefault();
  }

  function hightlightPointer(event: any) {
    event.target.classList.add("pointing");
  }

  function unHightlightPointer(event: any) {
    event.target.classList.remove("pointing");
  }

  function hightLightSelectedChessman(event: any) {
    setSelected(!isSelected);
    if (isSelected) event.target.classList.add("selected");
    else event.target.classList.remove("selected");
  }

  return (
    <>
      <img
        id={currentPos}
        className="chessman"
        style={{ top: data?.y, left: data?.x }}
        src={data?.object?.get().imageUrl}
        onDragStart={hideCurrentChessmanWhenClick}
        onDragEnd={(e) => moveChessman(e, currentPos)}
        onDragEnter={hightlightPointer}
        onDragLeave={unHightlightPointer}
        onDrop={unHightlightPointer}
        onDragOver={disableNotAllowedMouseCursor}
      ></img>
    </>
  );
}
