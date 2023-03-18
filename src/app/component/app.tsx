import React from "react";
import { Board } from "../entities/board/board";
import BoardComponent from "./board/board.component";

export default function App() {
  const board = new Board().getData(); // fix shit

  return (
    <>
      <BoardComponent board={board} />
    </>
  );
}
