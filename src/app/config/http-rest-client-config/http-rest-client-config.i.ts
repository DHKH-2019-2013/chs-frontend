export interface GetInitializeChessBoardResponse {
  fen: string;
}

export interface GetMoveParams {
  fen: string;
  move: string;
  int: string;
}

export interface GetMoveResponse {
  fen: string;
  move: string;
  isCheckmate: boolean;
}

export interface CheckValidMoveParams {
  fen: string;
  move: string;
}

export interface CheckValidMoveResponse {
  isValidMove: boolean;
}
