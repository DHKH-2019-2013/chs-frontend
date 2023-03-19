import React from "react";
import { ChessmanProps } from "./chessman.component.i";

export function ChessmanComponent({
  data,
  currentPos,
  moveChessman,
  hightlightSelectedCell,
  unHightlightSelectedCell,
  unHightlightMovePoint,
}: ChessmanProps) {
  function disableNotAllowedMouseCursor(event: any) {
    event.preventDefault();
  }

  function hideCurrentChessmanWhenClick(event: any) {
    unHightlightSelectedCell();
    hightlightSelectedCell(event);
  }

  function hightlightPointer(event: any) {
    event.target.classList.add("pointing");
  }

  function unHightlightPointer(event: any) {
    if (event.type === "drop") {
      unHightlightSelectedCell();
      unHightlightMovePoint();
    }
    event.target.classList.remove("pointing");
  }

  return (
    <div className="chessman-container" style={{ top: data?.y, left: data?.x }}>
      <span className="move-point"></span>
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
