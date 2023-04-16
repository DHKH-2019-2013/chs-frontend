import { GameMode } from "../../constant/constant";
import { Position } from "../../entities/board/board.i";

export interface BoardProps {
  roomId?: string;
  board: Record<string, Position>;
  getBoardFen: Function;
  setBoardFen: Function;
  side?: boolean;
  gameMode: GameMode;
}

export interface CastlingResult {
  isCastling: boolean;
  king?: {
    currentPos: string;
    nextPos: string;
  };
  rider?: {
    currentPos: string;
    nextPos: string;
  };
}

export interface PromotionResult {
  isPromotion: boolean;
}

export interface PlayerMoveInfo {
  move: string;
  isCheckmate: boolean;
  promotionUnit?: string;
}

export interface ListenUpdateMoveParams {
  fen: string;
  move: string;
  isCheckmate: boolean;
  promotionUnit?: string;
}
