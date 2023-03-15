import { Chessman } from "../chessman/chessman";

export interface BoardInfo {
  data: string;
  turn: boolean;
  side: boolean;
}

export interface Position {
  x: number;
  y: number;
  object?: Chessman;
}
