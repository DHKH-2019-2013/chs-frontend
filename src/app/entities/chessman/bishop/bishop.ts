import { getCode } from "../../../utils/utils";
import { Board } from "../../board/board";
import { Position } from "../../board/board.i";
import { Chessman } from "../chessman";

export class Bishop extends Chessman {
  constructor(
    imageUrl: string = "",
    side: boolean = false,
    code: string = "b"
  ) {
    super(imageUrl, side, code);
  }

  move(
    boardData: Record<string, Position>,
    currentPosition: string
  ): Array<string> {
    const moveContainer: Array<string> = [];
    const code = currentPosition.split("");
    const indexRow = Number(code[1]);
    const indexColumn = code[0].charCodeAt(0);

    // upper right
    for (let i = indexRow + 1, j = 1; i <= Board.MAX_ROW; i++, j++) {
      const code = getCode(indexColumn + j, i);
      if (!boardData[code] || boardData[code].object) break;
      moveContainer.push(code);
    }

    // upper left
    for (let i = indexRow + 1, j = 1; i <= Board.MAX_ROW; i++, j++) {
      const code = getCode(indexColumn - j, i);
      if (!boardData[code] || boardData[code].object) break;
      moveContainer.push(code);
    }

    // bottom right
    for (let i = indexRow - 1, j = 1; i >= Board.MIN_ROW; i--, j++) {
      const code = getCode(indexColumn + j, i);
      if (!boardData[code] || boardData[code].object) break;
      moveContainer.push(code);
    }

    // bottom left
    for (let i = indexRow - 1, j = 1; i >= Board.MIN_ROW; i--, j++) {
      const code = getCode(indexColumn - j, i);
      if (!boardData[code] || boardData[code].object) break;
      moveContainer.push(code);
    }

    return moveContainer;
  }
}
