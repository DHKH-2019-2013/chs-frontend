import { INITIALIZE_POSITION } from "../../constant/constant";
import { getCode } from "../../utils/utils";
import { Chessman } from "../chessman/chessman";
import { BoardInfo, Position } from "./board.i";

export class Board {
  static readonly WIDTH: number = 110;
  static readonly MIN_ROW: number = 1;
  static readonly MAX_ROW: number = 8;

  static readonly MIN_COLUMN: number = 1;
  static readonly MAX_COLUMN: number = 8;

  static readonly MIN_COLUMN_IN_CHAR: number = 97;
  static readonly MAX_COLUMN_IN_CHAR: number = 104;

  static checkMove(
    boardData: Record<string, Position>,
    position: string,
    currentSide: boolean
  ): {
    isMoveAble: boolean;
    isEnemy: boolean;
  } {
    let isMoveAble = false;
    let isEnemy = false;
    if (boardData[position]) {
      if (boardData[position].object.get().imageUrl.includes("empty")) isMoveAble = true;
      else if (boardData[position].object.get().side !== currentSide) {
        isMoveAble = true;
        isEnemy = true;
      }
    }

    return { isEnemy, isMoveAble };
  }

  private fen: string = "";
  private turn: boolean = false;
  private side: boolean = false;
  private url: string = "";
  private data: Record<string, Position> = {}; //hashMap

  constructor(fen: string = "", turn: boolean = false, side: boolean = false, url: string = "") {
    this.setFen(fen);
    this.setTurn(turn);
    this.setSide(side);
    this.setUrl(url);

    this.initializeBoardData();
  }

  public get(): BoardInfo {
    return {
      fen: this.getFen(),
      turn: this.getTurn(),
      side: this.getSide(),
    };
  }

  public showAvailableChessmanMove(movePointContainer: Array<string>) {
    for (const movePoint of movePointContainer) {
      this.data[movePoint].hasMovePoint = true;
    }
  }

  public updateChessmanOnBoard() {}

  public getWidth(): number {
    return Board.WIDTH;
  }

  public getMaxRow(): number {
    return Board.MAX_ROW;
  }

  public getMaxColumn(): number {
    return Board.MAX_COLUMN;
  }

  public getFen(): string {
    return this.fen;
  }

  public setFen(fen: string) {
    this.fen = fen;
  }

  public getTurn(): boolean {
    return this.turn;
  }

  public setTurn(turn: boolean) {
    this.turn = turn;
  }

  public getSide(): boolean {
    return this.side;
  }

  public setSide(side: boolean) {
    this.side = side;
  }

  public getUrl(): string {
    return this.url;
  }

  public setUrl(url: string) {
    this.url = url;
  }

  public getData(): Record<string, Position> {
    return this.data;
  }

  public setData(data: Record<string, Position>) {
    this.data = data;
  }

  public initializeBoardData() {
    for (let i = 8; i > 0; i--) {
      const currentRow = Board.MAX_ROW - i;

      // start from 'a' to 'h'
      for (let j = 97; j < 105; j++) {
        const currentColumn = Board.MAX_COLUMN - (105 - j);
        this.data[getCode(j, i)] = {
          x: currentColumn * Board.WIDTH,
          y: currentRow * Board.WIDTH,
          hasMovePoint: false,
          object: new Chessman("assets/empty.png", undefined, undefined),
        };
      }
    }

    this.initializeChessmanOnBoard();
  }

  public initializeChessmanOnBoard() {
    for (const key of Object.keys(INITIALIZE_POSITION)) {
      this.data[key].object = INITIALIZE_POSITION[key];
    }
  }
}
