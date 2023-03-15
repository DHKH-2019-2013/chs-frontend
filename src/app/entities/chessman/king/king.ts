import { Position } from "../../board/board.i";
import { Chessman } from "../chessman";

export class King extends Chessman {
  constructor(
    imageUrl: string = "",
    side: boolean = false,
    code: string = "k"
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

    return moveContainer;
  }
}
