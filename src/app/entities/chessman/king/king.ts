import { getCode } from "../../../utils/utils";
import { Board } from "../../board/board";
import { Position } from "../../board/board.i";
import { Chessman } from "../chessman";

export class King extends Chessman {
  constructor(imageUrl: string = "", side: boolean = false, code: string = "k") {
    super(imageUrl, side, code);
  }

  move(boardData: Record<string, Position>, currentPosition: string): Array<string> {
    const moveContainer: Array<string> = [];
    const code = currentPosition.split("");
    const indexRow = Number(code[1]);
    const indexColumn = code[0].charCodeAt(0);

    let _code = "";
    // top
    _code = getCode(indexColumn, indexRow + 1);
    if (Board.checkMove(boardData, _code, this.getSide()).isMoveAble) moveContainer.push(_code);

    // bottom
    _code = getCode(indexColumn, indexRow - 1);
    if (Board.checkMove(boardData, _code, this.getSide()).isMoveAble) moveContainer.push(_code);

    // right
    _code = getCode(indexColumn + 1, indexRow);
    if (Board.checkMove(boardData, _code, this.getSide()).isMoveAble) moveContainer.push(_code);

    // left
    _code = getCode(indexColumn - 1, indexRow);
    if (Board.checkMove(boardData, _code, this.getSide()).isMoveAble) moveContainer.push(_code);

    // top right
    _code = getCode(indexColumn + 1, indexRow + 1);
    if (Board.checkMove(boardData, _code, this.getSide()).isMoveAble) moveContainer.push(_code);

    // top left
    _code = getCode(indexColumn - 1, indexRow + 1);
    if (Board.checkMove(boardData, _code, this.getSide()).isMoveAble) moveContainer.push(_code);

    // bottom right
    _code = getCode(indexColumn + 1, indexRow - 1);
    if (Board.checkMove(boardData, _code, this.getSide()).isMoveAble) moveContainer.push(_code);

    // bottom left
    _code = getCode(indexColumn - 1, indexRow - 1);
    if (Board.checkMove(boardData, _code, this.getSide()).isMoveAble) moveContainer.push(_code);

    // castle
    // TODO: add move point to castle
    return moveContainer;
  }
}
