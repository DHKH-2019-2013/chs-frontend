import React from "react";
import { Board } from "../entities/board/board";
import BoardComponent from "./board/board.component";

export default function App() {
  const board = new Board();

  function updateBoardFen(fen: string) {
    board.setFen(fen);
  }

  return (
    <>
      <BoardComponent board={board.getData()} updateBoardFen={updateBoardFen} />
    </>
  );
}
