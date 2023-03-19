import { Position } from "../../entities/board/board.i";

export interface BoardProps {
  board: Record<string, Position>;
  updateBoardFen: Function;
}