import React, { useEffect, useRef } from "react";
import { GetInitializeChessBoardResponse } from "../../config/http-rest-client-config/http-rest-client-config.i";
import { HttpRestClientConfig } from "../../config/http-rest-client-config/http-rest-client.config";
import { Board } from "../../entities/board/board";
import BoardComponent from "../board/board.component";
import PlayerSettingsBarComponent from "../player-settings-bar/player-settings-bar.component";

export default function PlayerRoomComponent() {
  const board = useRef(new Board());

  useEffect(() => {
    (async () => {
      const response: GetInitializeChessBoardResponse = await HttpRestClientConfig.getInitializeChessBoard();
      setBoardFen(response.fen);
    })();
  });

  function setBoardFen(fen: string) {
    board.current.setFen(fen);
  }

  function getBoardFen(): string {
    return board.current.getFen();
  }

  return (
    <div id="web-player-room">
      <BoardComponent board={board.current.getData()} getBoardFen={getBoardFen} setBoardFen={setBoardFen} />
      <PlayerSettingsBarComponent />
    </div>
  );
}
