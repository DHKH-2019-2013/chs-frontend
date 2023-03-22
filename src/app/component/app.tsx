import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeComponent from "./home/home.component";
import PlayerRoomComponent from "./player-room/player-room.component";
import BotRoomComponent from "./bot-room/bot-room.component";
import LobbyComponent from "./lobby/lobby.componen";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeComponent />}></Route>
        <Route path="/lobby" element={<LobbyComponent />}></Route>
        <Route path="/bot" element={<BotRoomComponent />}></Route>
        <Route path="/player" element={<PlayerRoomComponent />}></Route>
      </Routes>
    </Router>
  );
}
