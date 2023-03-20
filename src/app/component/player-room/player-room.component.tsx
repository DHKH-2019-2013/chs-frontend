import React from "react";
import BoardComponent from "../board/board.component";
import { BotSettingsBar } from "../bot-settings-bar/bot-settings-bar.component";

export function PlayerRoom() {
  return (
    <>
      <BoardComponent />
      <BotSettingsBar />
    </>
  )
}