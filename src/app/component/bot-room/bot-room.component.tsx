import React from "react";
import BoardComponent from "../board/board.component";
import { BotSettingsBar } from "../bot-settings-bar/bot-settings-bar.component";

export function BotRoom() {
  return (
    <>
      <BoardComponent />
      <BotSettingsBar />
    </>
  )
}