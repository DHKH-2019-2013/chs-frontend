import React from "react";
import { Redirect } from "../../service/redirect/redirect.service";

export default function LobbyComponent() {
  function createRoom() {
    const roomId = "123344455";
    const playerName = (document.querySelector("input[type='text']") as HTMLInputElement).value;
    Redirect.toNewRoom(roomId, playerName);
  }

  return (
    <div id="web-lobby">
      <div id="user-action">
        <input type="text" value="player" />
        <button onClick={Redirect.toRoom}>Refresh</button>
        <button onClick={Redirect.toPlayerBoard}>Quick Join</button>
        <button onClick={createRoom}>Create room</button>
        <button onClick={Redirect.toHome}>Back to home screen</button>
        <button onClick={Redirect.toTest}>test</button>
      </div>
      <div id="lobby-action">
        <table>
          <thead>
            <tr>
              <th>Host name</th>
              <th>Player</th>
              <th>On progress</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>dong</td>
              <td>2</td>
              <td>Battle</td>
              <td>
                <a onClick={Redirect.toPlayerBoard}>Join</a>
              </td>
            </tr>
            <tr>
              <td>nipponwfm</td>
              <td>1</td>
              <td>Waiting</td>
              <td>
                <a onClick={Redirect.toPlayerBoard}>Join</a>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4}>{`[1] [2] [3] [4]`}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}
