import { Position } from "../../entities/board/board.i";

export interface ChessmanProps {
  data: Position;
  currentPos: string;
  handleDragEnd: Function;
}
