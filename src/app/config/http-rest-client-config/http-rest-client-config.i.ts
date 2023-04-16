export interface GetBotMoveParams {
  fen: string;
  move: string;
  int: string;
}

export interface GetBotMoveResponse {
  fen: string;
  move: string;
  isCheckmate: boolean;
  isGameOver: boolean;
}

export interface CheckValidMoveParams {
  fen: string;
  move: string;
}

export interface CheckValidMoveResponse {
  fen?: string;
  isValidMove: boolean;
  isCheckmate?: boolean;
  isGameOver?: boolean;
}
