import React, { useEffect } from "react";
import { Redirect } from "../../service/redirect/redirect.service";

export default function BotSettingsBarComponent() {
  useEffect(() => {
    const $difficultyButtons = document.querySelectorAll("#difficulty-list button")
    $difficultyButtons.forEach(elem => {
      elem.addEventListener("click", () => {
        $difficultyButtons.forEach(elem => { elem.classList.remove("difficulty-active") });
        elem.classList.add("difficulty-active")
      })
    })
  })

  return (
    <div id="bot-settings-bar">
      <div id="bot-settings-bar-difficulty">
        <h3>Difficulty</h3>
        <div id="difficulty-list">
          <button>Easy</button>
          <button className="difficulty-active">Medium</button>
          <button>Hard</button>
          <button>Expert</button>
        </div>
      </div>
      <div id="bot-settings-bar-history"></div>
      <div id="bot-settings-bar-action">
        <button onClick={Redirect.toHome}>Back to home screen</button>
        <button>{"<"} Prev Move</button>
        <button>Next Move {">"}</button>
        <button onClick={Redirect.toBotBoard}>New Game</button>
      </div>
    </div>
  )
}
