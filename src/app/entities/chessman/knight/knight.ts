import { getCode } from "../../../utils/utils";
import { Board } from "../../board/board";
import { Position } from "../../board/board.i";
import { Chessman } from "../chessman";

export class Knight extends Chessman {
  constructor(imageUrl: string = "", side: boolean = false, code: string = "n") {
    super(imageUrl, side, code);
  }

  move(boardData: Record<string, Position>, currentPosition: string): Array<string> {
    const moveContainer: Array<string> = [];
    const code = currentPosition.split("");
    const indexRow = Number(code[1]);
    const indexColumn = code[0].charCodeAt(0);

    let _code = "";
    // top right
    _code = getCode(indexColumn + 1, indexRow + 2);
    if (Board.checkMove(boardData, _code, this.getSide()).isMoveAble) moveContainer.push(_code);
    // top left
    _code = getCode(indexColumn - 1, indexRow + 2);
    if (Board.checkMove(boardData, _code, this.getSide()).isMoveAble) moveContainer.push(_code);

    // bottom right
    _code = getCode(indexColumn + 1, indexRow - 2);
    if (Board.checkMove(boardData, _code, this.getSide()).isMoveAble) moveContainer.push(_code);

    // bottom left
    _code = getCode(indexColumn - 1, indexRow - 2);
    if (Board.checkMove(boardData, _code, this.getSide()).isMoveAble) moveContainer.push(_code);

    // right top
    _code = getCode(indexColumn + 2, indexRow + 1);
    if (Board.checkMove(boardData, _code, this.getSide()).isMoveAble) moveContainer.push(_code);

    // right bottom
    _code = getCode(indexColumn + 2, indexRow - 1);
    if (Board.checkMove(boardData, _code, this.getSide()).isMoveAble) moveContainer.push(_code);

    // left top
    _code = getCode(indexColumn - 2, indexRow + 1);
    if (Board.checkMove(boardData, _code, this.getSide()).isMoveAble) moveContainer.push(_code);

    // left bottom
    _code = getCode(indexColumn - 2, indexRow - 1);
    if (Board.checkMove(boardData, _code, this.getSide()).isMoveAble) moveContainer.push(_code);

    return moveContainer;
  }
}
