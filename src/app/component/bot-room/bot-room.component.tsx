import React, { useEffect, useRef } from "react";
import { GameMode, INITIAL_FEN } from "../../constant/constant";
import { Board } from "../../entities/board/board";
import BoardComponent from "../board/board.component";
import BotSettingsBarComponent from "../bot-settings-bar/bot-settings-bar.component";

export default function BotRoomComponent() {
  const board = useRef(new Board("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"));

  useEffect(() => {
    document.getElementById("web-bot-room").style.transform = `scale(${
      document.querySelector("body").offsetWidth / 1600
    })`;
  });

  useEffect(() => {
    setBoardFen(board.current.getFen());
  });

  function setBoardFen(fen: string) {
    board.current.setFen(fen);
  }

  function getBoardFen(): string {
    return board.current.getFen();
  }

  return (
    <div id="web-bot-room">
      <BoardComponent
        board={board.current.getData()}
        getBoardFen={getBoardFen}
        setBoardFen={setBoardFen}
        side={true}
        getSide={() => true}
        gameMode={GameMode.PVE}
      />
      <BotSettingsBarComponent />
    </div>
  );
}
