import React from "react";
import { Redirect } from "../../service/redirect/redirect.service";

export default function HomeComponent() {
  return (
    <div id="web-main-intro">
      <div id="web-thumbnail">
        <img src="assets/home_thumbnail.png" />
      </div>
      <div id="web-title">
        <div id="main-title">
          <h1>Play Chess Online</h1>
        </div>
        <div id="current-player-title">
          <p>1 Playing Now</p>
        </div>
      </div>
      <div id="web-game-mode">
        <img onClick={Redirect.toRoom} src="assets/home_mode_player.png" />
        <img
          onClick={() => {
            Redirect.toBotBoard();
          }}
          src="assets/home_mode_bot.png"
        />
        <img src="assets/home_mode_puzzles.png" />
      </div>
    </div>
  );
}
