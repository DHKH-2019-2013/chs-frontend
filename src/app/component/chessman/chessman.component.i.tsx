import { Position } from "../../entities/board/board.i";

export interface ChessmanProps {
  data: Position;
  currentPos: string;
  moveChessmanByPlayer: Function;
  hightlightSelectedCell: Function;
  unHightlightSelectedCell: Function;
  unHightlightMovePoint: Function;
}
