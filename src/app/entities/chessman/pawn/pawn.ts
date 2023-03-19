import { getCode } from "../../../utils/utils";
import { Board } from "../../board/board";
import { Position } from "../../board/board.i";
import { Chessman } from "../chessman";

export class Pawn extends Chessman {
  constructor(imageUrl: string = "", side: boolean = false, code: string = "p") {
    super(imageUrl, side, code);
  }

  move(boardData: Record<string, Position>, currentPosition: string): Array<string> {
    const moveContainer: Array<string> = [];
    const code = currentPosition.split("");
    const indexRow = Number(code[1]);
    const indexColumn = code[0].charCodeAt(0);

    let _code = "";
    let _check = {} as any;

    const side = boardData[currentPosition].object.get().side;
    const expression = side ? 1 : -1;
    // top, bottom
    _code = getCode(indexColumn, indexRow + 1 * expression);
    _check = Board.checkMove(boardData, _code, this.getSide());
    if (_check.isMoveAble && !_check.isEnemy) {
      moveContainer.push(_code);

      // top, bottom
      if ((side && indexRow === 2) || (!side && indexRow === 7)) {
        _code = getCode(indexColumn, indexRow + 2 * expression);
        _check = Board.checkMove(boardData, _code, this.getSide());
        if (_check.isMoveAble && !_check.isEnemy) moveContainer.push(_code);
      }
    }

    // top right
    _code = getCode(indexColumn + 1, indexRow + 1 * expression);
    _check = Board.checkMove(boardData, _code, this.getSide());
    if (_check.isMoveAble && _check.isEnemy) moveContainer.push(_code);

    // top left
    _code = getCode(indexColumn - 1, indexRow + 1 * expression);
    _check = Board.checkMove(boardData, _code, this.getSide());
    if (_check.isMoveAble && _check.isEnemy) moveContainer.push(_code);

    return moveContainer;
  }
}
