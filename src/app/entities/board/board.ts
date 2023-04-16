import { INITIAL_FEN } from "../../constant/constant";
import { getCode } from "../../utils/utils";
import { Bishop } from "../chessman/bishop/bishop";
import { Chessman } from "../chessman/chessman";
import { King } from "../chessman/king/king";
import { Knight } from "../chessman/knight/knight";
import { Pawn } from "../chessman/pawn/pawn";
import { Queen } from "../chessman/queen/queen";
import { Rider } from "../chessman/rider/rider";
import { BoardInfo, Position } from "./board.i";

export class Board {
  static readonly WIDTH: number = 80;
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

  private fen: string = INITIAL_FEN;
  private turn: boolean = false;
  private side: boolean = true;
  private url: string = "";
  private data: Record<string, Position> = {}; //hashMap

  constructor(fen: string = "", turn: boolean = false, side: boolean = true, url: string = "") {
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

  public generateChessmanPosition(fen: string) {
    const result: any = {};
    const data = fen.split(" ")[0].split("/");

    let currentRow = 8;
    for (const fenRow of data) {
      let currentColumn = 97; // equal 'a' in char code
      for (let i = 0; i < fenRow.length; i++) {
        let chessman = null;
        switch (fenRow[i]) {
          case "r": {
            chessman = new Rider("assets/_r.png", false);
            break;
          }
          case "n": {
            chessman = new Knight("assets/_n.png", false);
            break;
          }
          case "b": {
            chessman = new Bishop("assets/_b.png", false);
            break;
          }
          case "q": {
            chessman = new Queen("assets/_q.png", false);
            break;
          }
          case "k": {
            chessman = new King("assets/_k.png", false);
            break;
          }
          case "p": {
            chessman = new Pawn("assets/_p.png", false);
            break;
          }
          case "R": {
            chessman = new Rider("assets/R.png", true);
            break;
          }
          case "N": {
            chessman = new Knight("assets/N.png", true);
            break;
          }
          case "B": {
            chessman = new Bishop("assets/B.png", true);
            break;
          }
          case "Q": {
            chessman = new Queen("assets/Q.png", true);
            break;
          }
          case "K": {
            chessman = new King("assets/K.png", true);
            break;
          }
          case "P": {
            chessman = new Pawn("assets/P.png", true);
            break;
          }
          default: {
            break;
          }
        }
        if (chessman) result[`${String.fromCharCode(currentColumn)}${currentRow}`] = chessman;
        if (Boolean(Number(fenRow[i]))) currentColumn = currentColumn + Number(fenRow[i]);
        else currentColumn++;
      }
      currentRow--;
    }
    return result;
  }

  public initializeChessmanOnBoard() {
    // const fen = "8/6P1/8/8/8/8/1p6/8 w - - 0 1";
    const INITIALIZE_POSITION = this.generateChessmanPosition(this.fen); //fen
    for (const key of Object.keys(INITIALIZE_POSITION)) {
      this.data[key].object = INITIALIZE_POSITION[key];
    }
  }
}
