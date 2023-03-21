import { Position } from "../../entities/board/board.i";

export interface ChessmanProps {
  data: Position;
  currentPos: string;
  moveChessmanByPlayer: Function;
  highLightSelectedCell: Function;
  unHighLightSelectedCell: Function;
  unHighLightMovePoint: Function;
}
