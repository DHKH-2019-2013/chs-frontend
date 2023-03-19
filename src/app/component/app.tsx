import React, { useEffect } from "react";
import { GetInitializeChessBoardResponse } from "../config/http-rest-client-config/http-rest-client-config.i";
import { HttpRestClientConfig } from "../config/http-rest-client-config/http-rest-client.config";
import { Board } from "../entities/board/board";
import BoardComponent from "./board/board.component";

export default function App() {
  const board = new Board();

  useEffect(() => {
    (async () => {
      const response: GetInitializeChessBoardResponse = await HttpRestClientConfig.getInitializeChessBoard();
      setBoardFen(response.fen);
    })();
  });

  function setBoardFen(fen: string) {
    board.setFen(fen);
  }

  function getBoardFen(): string {
    return board.getFen();
  }

  return (
    <>
      <BoardComponent board={board.getData()} getBoardFen={getBoardFen} setBoardFen={setBoardFen} />
    </>
  );
}
