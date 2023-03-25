export interface GetInitializeChessBoardResponse {
  fen: string;
}

export interface GetBotMoveParams {
  fen: string;
  move: string;
  int: string;
}

export interface GetBotMoveResponse {
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

export interface GetPlayerMoveParams {
  fen: string;
  move: string;
}

export interface GetPlayerMoveResponse {
  fen: string;
  move: string;
  isCheckmate: boolean;
}
