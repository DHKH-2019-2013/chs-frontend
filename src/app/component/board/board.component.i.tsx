import { GameMode } from "../../constant/constant";
import { Position } from "../../entities/board/board.i";
import { HistoryCommand } from "../bot-room/bot-room.component.i";

export interface BoardProps {
  roomId?: string;
  board: Record<string, Position>;
  getBoardFen: Function;
  setBoardFen: Function;
  side?: boolean; // pvp only
  gameMode: GameMode;
  historyCommand?: HistoryCommand; //pve only
  reRenderBoard?: Function; //pve only
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

export type BoardHistories = Array<{
  fen: string;
  isCheckmate: boolean;
  isBotCheckmate: boolean;
  move: string;
}>;

export interface IncomingHistory {
  fen: string;
  isCheckmate: boolean;
  isBotCheckmate: boolean;
}

export interface GetKingsPositionResult {
  w_king: string;
  b_king: string;
}
