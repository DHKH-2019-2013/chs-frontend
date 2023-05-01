import React, { useEffect, useRef, useState } from "react";
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
  const [side, setSide] = useState(true);

  useEffect(() => {
    document.getElementById("web-player-room").style.transform = `scale(${
      document.querySelector("body").offsetWidth / 1600
    })`;

    (document.querySelector("#board-container") as HTMLElement).style.cursor = "wait";
    document.querySelectorAll(".chessman").forEach((e: any) => {
      e.style.pointerEvents = "none";
    });
  }, []);

  useEffect(() => {
    socket.on("start-match", async ({ side }) => {
      const boardCursor = side ? "initial" : "wait";
      const chessManCursor = side ? "initial" : "none";

      (document.querySelector("#board-container") as HTMLElement).style.cursor = boardCursor;
      document.querySelectorAll(".chessman").forEach((e: any) => {
        e.style.pointerEvents = chessManCursor;
      });

      document.getElementById("board-container").style.transform = `rotate(${side ? "0deg" : "180deg"})`;
      document.querySelectorAll(".chessman-container").forEach((elem: HTMLElement) => {
        elem.style.transform = `rotate(${side ? "0deg" : "180deg"})`;
      });

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

  return (
    <div id="web-player-room">
      <BoardComponent
        roomId={getRoomId()}
        board={board.current.getData()}
        getBoardFen={getBoardFen}
        setBoardFen={setBoardFen}
        side={side}
        gameMode={GameMode.PVP}
      />
      <PlayerSettingsBarComponent roomId={getRoomId()} />
    </div>
  );
}
