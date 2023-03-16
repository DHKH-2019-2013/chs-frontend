import { getCode } from "../../../utils/utils";
import { Board } from "../../board/board";
import { Position } from "../../board/board.i";
import { Chessman } from "../chessman";

export class Queen extends Chessman {
  constructor(imageUrl: string = "", side: boolean = false, code: string = "q") {
    super(imageUrl, side, code);
  }

  move(boardData: Record<string, Position>, currentPosition: string): Array<string> {
    const moveContainer: Array<string> = [];
    const code = currentPosition.split("");
    const indexRow = Number(code[1]);
    const indexColumn = code[0].charCodeAt(0);

    // up
    for (let i = indexRow + 1; i <= Board.MAX_ROW; i++) {
      const code = getCode(indexColumn, i);
      const check = Board.checkMove(boardData, code, this.getSide());
      if (check.isMoveAble) {
        moveContainer.push(code);
        if (check.isEnemy) break;
      } else break;
    }

    // down
    for (let i = indexRow - 1; i >= Board.MAX_ROW; i--) {
      const code = getCode(indexColumn, i);
      const check = Board.checkMove(boardData, code, this.getSide());
      if (check.isMoveAble) {
        moveContainer.push(code);
        if (check.isEnemy) break;
      } else break;
    }

    // right
    for (let i = indexColumn + 1; i <= Board.MAX_COLUMN_IN_CHAR; i++) {
      const code = getCode(i, indexRow);
      const check = Board.checkMove(boardData, code, this.getSide());
      if (check.isMoveAble) {
        moveContainer.push(code);
        if (check.isEnemy) break;
      } else break;
    }

    // left
    for (let i = indexColumn - 1; i >= Board.MIN_COLUMN_IN_CHAR; i--) {
      const code = getCode(i, indexRow);
      const check = Board.checkMove(boardData, code, this.getSide());
      if (check.isMoveAble) {
        moveContainer.push(code);
        if (check.isEnemy) break;
      } else break;
    }

    // upper right
    for (let i = indexRow + 1, j = 1; i <= Board.MAX_ROW; i++, j++) {
      const code = getCode(indexColumn + j, i);
      const check = Board.checkMove(boardData, code, this.getSide());
      if (check.isMoveAble) {
        moveContainer.push(code);
        if (check.isEnemy) break;
      } else break;
    }

    // upper left
    for (let i = indexRow + 1, j = 1; i <= Board.MAX_ROW; i++, j++) {
      const code = getCode(indexColumn - j, i);
      const check = Board.checkMove(boardData, code, this.getSide());
      if (check.isMoveAble) {
        moveContainer.push(code);
        if (check.isEnemy) break;
      } else break;
    }

    // bottom right
    for (let i = indexRow - 1, j = 1; i >= Board.MIN_ROW; i--, j++) {
      const code = getCode(indexColumn + j, i);
      const check = Board.checkMove(boardData, code, this.getSide());
      if (check.isMoveAble) {
        moveContainer.push(code);
        if (check.isEnemy) break;
      } else break;
    }

    // bottom left
    for (let i = indexRow - 1, j = 1; i >= Board.MIN_ROW; i--, j++) {
      const code = getCode(indexColumn - j, i);
      const check = Board.checkMove(boardData, code, this.getSide());
      if (check.isMoveAble) {
        moveContainer.push(code);
        if (check.isEnemy) break;
      } else break;
    }

    return moveContainer;
  }
}
