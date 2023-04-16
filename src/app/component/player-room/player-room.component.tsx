import React, { useEffect, useRef, useState } from "react";
import { joinRoom } from "../../config/socket-client-config/socket-client-config";
import { GameMode } from "../../constant/constant";
import { Board } from "../../entities/board/board";
import { socket } from "../../service/socket/socket.service";
import BoardComponent from "../board/board.component";
import PlayerSettingsBarComponent from "../player-settings-bar/player-settings-bar.component";

export default function PlayerRoomComponent() {
  const params = new URL(location.href).searchParams;
  const board = useRef(new Board("4k3/6P1/8/8/8/8/1p6/4K3 w - - 0 1"));
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    document.getElementById("web-player-room").style.transform = `scale(${
      document.querySelector("body").offsetWidth / 1600
    })`;
  }, []);

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
    if (isReady) {
      setBoardFen(board.current.getFen());
    }
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
        gameMode={GameMode.PVP}
      />
      <PlayerSettingsBarComponent roomId={getRoomId()} />
    </div>
  );
}
