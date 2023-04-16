import React, { useEffect, useState } from "react";
import { PromotionBoardProps } from "./promotion-board.component.i";

export default function PromotionBoardComponent({ side }: PromotionBoardProps) {
  const [promotionContainer, setPromotionContainer] = useState([]);

  const whitePromotionContainers = [
    "assets/R.png",
    "assets/N.png",
    "assets/B.png",
    "assets/Q.png",
    "assets/P.png",
  ];
  const blackPromotionContainers = [
    "assets/_r.png",
    "assets/_n.png",
    "assets/_b.png",
    "assets/_q.png",
    "assets/_p.png",
  ];

  useEffect(() => {
    setPromotionContainer(side ? whitePromotionContainers : blackPromotionContainers);
  }, [side]);

  return (
    <div id="promotion-board-container">
      {promotionContainer.map((url) => {
        return (
          <div key={url}>
            <img src={url} />
          </div>
        );
      })}
    </div>
  );
}
