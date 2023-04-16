import { CHESSMAN_ASSET_URL } from "../../constant/constant";

export interface PromotionBoardProps {
  side: boolean;
  handlePromotion: Function;
}

export type ChessManContainer = Array<{
  url: string;
  code: string;
}>;

export const WHITE_PROMOTION_CONTAINERS: ChessManContainer = [
  {
    url: CHESSMAN_ASSET_URL.WHITE_RIDER,
    code: "r",
  },
  {
    url: CHESSMAN_ASSET_URL.WHITE_KNIGHT,
    code: "n",
  },
  {
    url: CHESSMAN_ASSET_URL.WHITE_BISHOP,
    code: "b",
  },
  {
    url: CHESSMAN_ASSET_URL.WHITE_QUEEN,
    code: "q",
  },
  {
    url: CHESSMAN_ASSET_URL.WHITE_PAWN,
    code: "p",
  },
];

export const BLACK_PROMOTION_CONTAINERS: ChessManContainer = [
  {
    url: CHESSMAN_ASSET_URL.BLACK_RIDER,
    code: "r",
  },
  {
    url: CHESSMAN_ASSET_URL.BLACK_KNIGHT,
    code: "n",
  },
  {
    url: CHESSMAN_ASSET_URL.BLACK_BISHOP,
    code: "b",
  },
  {
    url: CHESSMAN_ASSET_URL.BLACK_QUEEN,
    code: "q",
  },
  {
    url: CHESSMAN_ASSET_URL.BLACK_PAWN,
    code: "p",
  },
];
