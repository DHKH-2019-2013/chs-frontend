import React from "react";
import { Redirect } from "../../service/redirect/redirect.service";

export default function LobbyComponent() {
  function generateRoomId(length: number) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

  function createRoom() {
    const roomId = generateRoomId(8);
    const playerName = (document.querySelector("input[type='text']") as HTMLInputElement).value;
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
      <div id="lobby-action" style={{}}>
        <table>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Host name</th>
              <th style={{ textAlign: "center" }}>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {[1].map((e) => {
              return (
                <>
                  <tr>
                      <td style={{ textAlign: "left" }}>dong</td>
                      <td style={{ textAlign: "center" }} className="label-status-battle">Battle</td>
                      <td style={{ textAlign: "center" }}>
                        <a onClick={Redirect.toPlayerBoard}>Join</a>
                      </td>
                    </tr>
                    <tr>
                    <td style={{ textAlign: "left" }}>nipponwfm</td>
                    <td style={{ textAlign: "center" }} className="label-status-waiting">Waiting</td>
                    <td style={{ textAlign: "center" }}>
                      <a onClick={Redirect.toPlayerBoard}>Join</a>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
