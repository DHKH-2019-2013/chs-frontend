export interface BoardProps {
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
