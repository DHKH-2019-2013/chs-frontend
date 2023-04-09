import React from "react";
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
    // dragChessman(event);
  }

  function highLightPointer(event: any) {
    event.target.parentNode.classList.add("pointing");
  }

  function dragChessman(event: any) {
    const $board = document.querySelector("#board-container");

    document.addEventListener("drag", (evt) => {
      let x = evt.pageX - $board.getBoundingClientRect().x - CHESS_SIZE / 2;
      let y = evt.pageY - $board.getBoundingClientRect().y - CHESS_SIZE / 2;

      // detect conclusion
      if (x <= 0 - CHESS_SIZE / 2) x = -CHESS_SIZE / 2;
      else if (x >= $board.getBoundingClientRect().width - CHESS_SIZE / 2)
        x = $board.getBoundingClientRect().width - CHESS_SIZE / 2;

      if (y <= 0 - CHESS_SIZE / 2) y = -CHESS_SIZE / 2;
      else if (y >= $board.getBoundingClientRect().height - CHESS_SIZE / 2)
        y = $board.getBoundingClientRect().height - CHESS_SIZE / 2;

      event.target.style.position = "fixed";
      event.target.style.top = `${y - event.target.parentNode.offsetTop}px`;
      event.target.style.left = `${x - event.target.parentNode.offsetLeft}px`;
    });
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
