export const INITIAL_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";

export const INTELIGENCE = 15;

export const CHESS_SIZE = 80;

export enum GameMode {
  PVP = "pvp",
  PVE = "pve",
}

export enum CHESSMAN_ASSET_URL {
  WHITE_RIDER = "assets/R.png",
  WHITE_KNIGHT = "assets/N.png",
  WHITE_BISHOP = "assets/B.png",
  WHITE_QUEEN = "assets/Q.png",
  WHITE_KING = "assets/K.png",
  WHITE_PAWN = "assets/P.png",

  BLACK_RIDER = "assets/_r.png",
  BLACK_KNIGHT = "assets/_n.png",
  BLACK_BISHOP = "assets/_b.png",
  BLACK_QUEEN = "assets/_q.png",
  BLACK_KING = "assets/_k.png",
  BLACK_PAWN = "assets/_p.png",
}
