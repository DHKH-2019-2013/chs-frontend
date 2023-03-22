import React from "react";
import { Redirect } from "../../service/redirect/redirect.service";

export default function PlayerSettingsBarComponent() {
  function sendMessage() {
    const $incomingMessage = document.querySelector("#player-settings-main-message-type input[type='text']") as HTMLInputElement;
    if ($incomingMessage.value.trim() === "") return;

    // create new bubble message
    const $newBubbleMessage = document.createElement("span");
    const $bubbleMessageContainer = document.querySelector("#player-settings-main-message-display");

    $newBubbleMessage.classList.add("bubble-message");
    $newBubbleMessage.textContent = $incomingMessage.value;
    $bubbleMessageContainer.appendChild($newBubbleMessage);

    // clear input
    $incomingMessage.value = "";

    // toggle scroll bar
    autoScrollBar()
  }

  function handleEnterMessage(event: any) {
    if(event.key === "Enter") sendMessage()
  }

  function switchTab(tabName: string) {
    const $tabs = document.querySelectorAll(".player-settings-tab");
    $tabs.forEach((elem: any) => {
      elem.style.display = "none"
    })

    let displayStyle = "block";
    if (tabName === "player-settings-main") displayStyle = "grid";
    document.getElementById(tabName).style.display = displayStyle;
  }

  function autoScrollBar() {
    const $messageContainer = document.getElementById("player-settings-main-message-display");
    $messageContainer.scrollTop = $messageContainer.scrollHeight
  }

  return (
    <div id="player-settings-bar">
      <div id="player-settings-tabs-container">
        <button onClick={() => {switchTab('player-settings-main')}}>Main</button>
        <button onClick={() => {switchTab('player-settings-list')}}>Players</button>
        <button onClick={() => {switchTab('player-settings-action')}}>Action</button>
      </div>

      <div id="player-settings-main" className="player-settings-tab">
        <div id="player-settings-main-message-display">
          <span className="bubble-message">Welcome player!</span>
        </div>
        <div id="player-settings-main-message-type">
          <input type="text" onKeyDown={handleEnterMessage}/>
          <input type="button" value="Send" onClick={sendMessage}/>
        </div>
      </div>

      <div id="player-settings-list" className="player-settings-tab" style={{ display: "none" }}>
        <li>dong</li>
      </div>

      <div id="player-settings-action" className="player-settings-tab" style={{ display: "none" }}>
        <li>Surrender</li>
        <li onClick={Redirect.toRoom}>Leave</li>
      </div>
    </div>
  )
}
