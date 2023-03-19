import { Position } from "../../entities/board/board.i";

export interface BoardProps {
  board: Record<string, Position>;
  getBoardFen: Function;
  setBoardFen: Function;
}

export interface CastlingResult {
  isCastling: boolean;
  king?: {
    currentPos: string;
    nextPos: string;
  };
  rider?: {
    currentPos: string;
    nextPos: string;
  };
}
