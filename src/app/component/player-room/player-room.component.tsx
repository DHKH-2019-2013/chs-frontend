import React, { useEffect, useRef, useState } from "react";
import { GetInitializeChessBoardResponse } from "../../config/http-rest-client-config/http-rest-client-config.i";
import { HttpRestClientConfig } from "../../config/http-rest-client-config/http-rest-client.config";
import { joinRoom } from "../../config/socket-client-config/socket-client-config";
import { GameMode } from "../../constant/constant";
import { Board } from "../../entities/board/board";
import { socket } from "../../service/socket/socket.service";
import BoardComponent from "../board/board.component";
import PlayerSettingsBarComponent from "../player-settings-bar/player-settings-bar.component";

export default function PlayerRoomComponent() {
  const params = new URL(location.href).searchParams;
  const board = useRef(new Board());
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    socket.on("start-match", async ({ side }) => {
      setSide(side);
      setReady(true);
    });
  }, []);

  useEffect(() => {
    (async () => {
      const roomId = getRoomId();
      const playerName = getPlayerName();
      joinRoom(roomId, playerName);
    })();
  });

  useEffect(() => {
    (async () => {
      if (isReady) {
        const response: GetInitializeChessBoardResponse = await HttpRestClientConfig.getInitializeChessBoard();
        setBoardFen(response.fen);
      }
    })();
  }, [isReady]);

  function setBoardFen(fen: string) {
    board.current.setFen(fen);
  }

  function getBoardFen(): string {
    return board.current.getFen();
  }

  function getRoomId(): string {
    return params.get("roomId");
  }

  function getPlayerName(): string {
    return params.get("name");
  }

  function setSide(side: boolean) {
    board.current.setSide(side);
  }

  function getSide() {
    return board.current.getSide();
  }

  return (
    <div id="web-player-room">
      <BoardComponent
        roomId={getRoomId()}
        board={board.current.getData()}
        getBoardFen={getBoardFen}
        setBoardFen={setBoardFen}
        side={getSide()}
        getSide={getSide}
        gameMode={GameMode.PVP}
      />
      <PlayerSettingsBarComponent />
    </div>
  );
}
