import React, { useEffect, useState } from "react";
import {
  ChessManContainer,
  BLACK_PROMOTION_CONTAINERS,
  PromotionBoardProps,
  WHITE_PROMOTION_CONTAINERS,
} from "./promotion-board.component.i";

export default function PromotionBoardComponent({ side, handlePromotion }: PromotionBoardProps) {
  const [promotionContainer, setPromotionContainer] = useState<ChessManContainer>([]);

  const whitePromotionContainers = WHITE_PROMOTION_CONTAINERS;
  const blackPromotionContainers = BLACK_PROMOTION_CONTAINERS;

  useEffect(() => {
    setPromotionContainer(side ? whitePromotionContainers : blackPromotionContainers);
  }, [side]);

  return (
    <div id="promotion-board-container">
      {promotionContainer.map(({ url, code }) => {
        return (
          <div key={url} className={code} onDoubleClick={(event) => handlePromotion(event)}>
            <img src={url} />
          </div>
        );
      })}
    </div>
  );
}
