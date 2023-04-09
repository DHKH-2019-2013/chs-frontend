import React, { useEffect } from "react";
import { ChessmanProps } from "./chessman.component.i";
import { CHESS_SIZE } from "../../constant/constant";

export default function ChessmanComponent({
  data,
  currentPos,
  moveChessmanByPlayer,
  highLightSelectedCell,
  unHighLightSelectedCell,
  unHighLightMovePoint,
}: ChessmanProps) {
  function disableNotAllowedMouseCursor(event: any) {
    event.preventDefault();
  }

  function hideCurrentChessmanWhenClick(event: any) {
    if (!event.target.src.includes("empty")) unHighLightSelectedCell();
    highLightSelectedCell(event);
  }

  function highLightPointer(event: any) {
    event.target.parentNode.classList.add("pointing");
  }

  function unHighLightPointer(event: any) {
    if (event.type === "drop") {
      unHighLightSelectedCell();
      unHighLightMovePoint();
    }
    event.target.parentNode.classList.remove("pointing");
  }

  return (
    <div className="chessman-container" style={{ top: data?.y, left: data?.x }}>
      <span className="move-point"></span>
      <img
        id={currentPos}
        className="chessman"
        src={data?.object?.get().imageUrl}
        onDragStart={hideCurrentChessmanWhenClick}
        onDragEnd={(e) => moveChessmanByPlayer(e, currentPos)}
        onDragEnter={highLightPointer}
        onDragLeave={unHighLightPointer}
        onDrop={unHighLightPointer}
        onDragOver={disableNotAllowedMouseCursor}
        onClick={(event) => highLightSelectedCell(event)}
      ></img>
    </div>
  );
}
