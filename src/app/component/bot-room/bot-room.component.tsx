import React, { useEffect, useRef, useState } from "react";
import { GameMode, INITIAL_FEN } from "../../constant/constant";
import { Board } from "../../entities/board/board";
import BoardComponent from "../board/board.component";
import BotSettingsBarComponent from "../bot-settings-bar/bot-settings-bar.component";
import { HistoryCommand } from "./bot-room.component.i";
import { BoardHistory } from "../board/board.component.i";

export default function BotRoomComponent() {
  const oldBoard = JSON.parse(localStorage.getItem("bot-history")) as BoardHistory;
  const board = useRef(new Board(oldBoard?.fen || INITIAL_FEN));
  const [historyCommand, setHistoryCommand] = useState<HistoryCommand>();

  useEffect(() => {
    document.getElementById("web-bot-room").style.transform = `scale(${
      document.querySelector("body").offsetWidth / 1600
    })`;
  }, []);

  useEffect(() => {
    setBoardFen(board.current.getFen());
  }, []);

  function setBoardFen(fen: string) {
    board.current.setFen(fen);
  }

  function getBoardFen(): string {
    return board.current.getFen();
  }

  function toggleChangeBoardHistory(type: string) {
    setHistoryCommand({ type, rand: Math.random() * 10 });
  }

  function reRenderBoard(fen: string) {
    board.current.setFen(fen);
    board.current.initializeChessmanOnBoard(fen);
  }

  return (
    <div id="web-bot-room">
      <BoardComponent
        oldBoard={oldBoard}
        board={board.current.getData()}
        getBoardFen={getBoardFen}
        setBoardFen={setBoardFen}
        side={true}
        gameMode={GameMode.PVE}
        historyCommand={historyCommand}
        reRenderBoard={reRenderBoard}
      />
      <BotSettingsBarComponent toggleChangeBoardHistory={toggleChangeBoardHistory} />
    </div>
  );
}
