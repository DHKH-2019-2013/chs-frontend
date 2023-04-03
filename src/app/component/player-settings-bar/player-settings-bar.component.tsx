import React, { useEffect } from "react";
import { sendMessage } from "../../config/socket-client-config/socket-client-config";
import { Redirect } from "../../service/redirect/redirect.service";
import { socket } from "../../service/socket/socket.service";
import { PlayerSettingsBarProps } from "./player-settings-bar.component.i";

export function sendMessageInPlayerRoom(roomId: string, isYouSend: boolean, systemMessage?: string) {
  const $incomingMessage = document.querySelector(
    "#player-settings-main-message-type input[type='text']"
  ) as HTMLInputElement;

  let message = isYouSend ? $incomingMessage.value : systemMessage;
  if (message.trim() === "") return;

  // create new bubble message
  const $div = document.createElement("div");
  const $newBubbleMessage = document.createElement("span");
  const $bubbleMessageContainer = document.querySelector("#player-settings-main-message-display");

  if (isYouSend) $div.classList.add("right");
  $newBubbleMessage.classList.add("bubble-message");
  $newBubbleMessage.textContent = message;
  $div.appendChild($newBubbleMessage);
  $bubbleMessageContainer.appendChild($div);

  // toggle scroll bar
  const $messageContainer = document.getElementById("player-settings-main-message-display");
  $messageContainer.scrollTop = $messageContainer.scrollHeight;

  // send message to other player
  if (isYouSend) sendMessage(roomId, $incomingMessage.value);

  // clear input
  if (isYouSend) $incomingMessage.value = "";
}

export default function PlayerSettingsBarComponent({ roomId }: PlayerSettingsBarProps) {
  useEffect(() => {
    socket.on("incoming-chat", ({ message }) => {
      sendMessageInPlayerRoom(roomId, false, message);
    });
  }, []);

  function handleEnterMessage(event: any) {
    if (event.key === "Enter") sendMessageInPlayerRoom(roomId, true);
  }

  function switchTab(tabName: string) {
    // remove previous style
    const $tabs = document.querySelectorAll(".player-settings-tab");
    $tabs.forEach((elem: any) => {
      elem.style.display = "none";
      (event.target as HTMLElement).classList.remove("active");
    });
    const $button = document.querySelectorAll("#player-settings-tabs-container button")
    $button.forEach((elem: any) => {
      elem.classList.remove("active")
    })

    // set style to new one
    let displayStyle = "block";
    if (tabName === "player-settings-main") displayStyle = "grid";
    document.getElementById(tabName).style.display = displayStyle;
    (event.target as HTMLElement).classList.add("active");
  }

  return (
    <div id="player-settings-bar">
      <div id="player-settings-tabs-container">
        <button
          onClick={() => {
            switchTab("player-settings-main");
          }}
          className="active"
        >
          Main
        </button>
        <button
          onClick={() => {
            switchTab("player-settings-list");
          }}
        >
          Players
        </button>
        <button
          onClick={() => {
            switchTab("player-settings-action");
          }}
        >
          Action
        </button>
      </div>

      <div id="player-settings-main" className="player-settings-tab">
        <div id="player-settings-main-message-display">
          <div>
            <span className="bubble-message">Welcome player!</span>
          </div>
        </div>
        <div id="player-settings-main-message-type">
          <input type="text" onKeyDown={handleEnterMessage} />
          <input
            type="button"
            value="Send"
            onClick={() => {
              sendMessageInPlayerRoom(roomId, true);
            }}
          />
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
  );
}
