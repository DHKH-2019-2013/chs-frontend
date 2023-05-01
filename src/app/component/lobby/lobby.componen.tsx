import React, { useEffect, useState } from "react";
import { Redirect } from "../../service/redirect/redirect.service";
import { socket } from "../../service/socket/socket.service";
import { RoomDB } from "./lobby.componen.i";

export default function LobbyComponent() {
  const [roomsDB, setRoomsDB] = useState<RoomDB[]>([]);

  useEffect(() => {
    socket.emit("get-lobbies");
  }, []);

  useEffect(() => {
    socket.on("return-lobbies", ({ roomsDB }) => {
      setRoomsDB(roomsDB);
    });
  }, []);

  function generateRoomId(length: number) {
    let result = "";
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }

  function getPlayerName(): string {
    return (document.querySelector("input[type='text']") as HTMLInputElement).value;
  }

  function createRoom() {
    const roomId = generateRoomId(8);
    const playerName = getPlayerName();
    Redirect.toNewRoom(roomId, playerName);
  }

  return (
    <div id="web-lobby">
      <div id="user-action">
        <div id="user-menu">
          <input type="text" defaultValue="player" placeholder="enter your ingame" />
          <button onClick={Redirect.toRoom}>Refresh</button>
          <button onClick={createRoom}>Create room</button>
          <button onClick={Redirect.toHome}>Back to home screen</button>
        </div>
      </div>
      <div id="lobby-action">
        <table>
          <thead>
            <tr>
              <th style={{ width: "60%", textAlign: "left" }}>Host name</th>
              <th style={{ width: "20%", textAlign: "center" }}>Status</th>
              <th style={{ width: "20%" }}></th>
            </tr>
          </thead>
          <tbody>
            {roomsDB.map((room) => (
              <tr key={room.roomId}>
                <td style={{ textAlign: "left" }}>{room.players[0].name}</td>
                <td
                  style={{ textAlign: "center" }}
                  className={room.players.length < 2 ? "label-status-waiting" : "label-status-battle"}
                >
                  {room.players.length < 2 ? "Waiting" : "Battle"}
                </td>
                <td style={{ textAlign: "center" }}>
                  <a
                    onClick={() => {
                      Redirect.toPlayerBoard(room.roomId, getPlayerName());
                    }}
                    className={room.players.length < 2 ? "" : "disabled"}
                  >
                    Join
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
