import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { Home } from "./home/home.component";
import { PlayerRoom } from "./player-room/player-room.component";
import { BotRoom } from "./bot-room/bot-room.component";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/"element={<Home />}></Route>
        <Route path="/bot" element={<BotRoom />}></Route>
        <Route path="/player" element={<PlayerRoom />}></Route>
      </Routes>
    </Router>
  );
}
