import { BoardHistories } from "../../component/board/board.component.i";
import { Position } from "../board/board.i";
import { ChessmanInfo } from "./chessman.i";

export class Chessman {
  private imageUrl: string = "";
  private side: boolean = false;
  private code: string = "";

  constructor(imageUrl: string = "", side: boolean = undefined, code: string = "") {
    this.setImageUrl(imageUrl);
    this.setSide(side);
    this.setCode(code);
  }

  public get(): ChessmanInfo {
    return {
      imageUrl: this.getImageUrl(),
      side: this.getSide(),
      code: this.getCode(),
    };
  }

  public move(
    boardData: Record<string, Position>,
    currentPosition: string,
    histories?: BoardHistories
  ): Array<string> {
    return [];
  }

  protected getImageUrl(): string {
    return this.imageUrl;
  }

  protected setImageUrl(imageUrl: string) {
    this.imageUrl = imageUrl;
  }

  protected getSide(): boolean {
    return this.side;
  }

  protected setSide(side: boolean) {
    this.side = side;
  }

  protected getCode(): string {
    return this.code;
  }

  protected setCode(code: string) {
    this.code = this.side ? code.toLocaleUpperCase() : code;
  }
}
