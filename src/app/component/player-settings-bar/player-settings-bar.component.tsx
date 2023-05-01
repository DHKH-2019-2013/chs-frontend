import React, { useEffect, useState } from "react";
import { sendMessage } from "../../config/socket-client-config/socket-client-config";
import { Redirect } from "../../service/redirect/redirect.service";
import { socket } from "../../service/socket/socket.service";
import { PlayerSettingsBarProps } from "./player-settings-bar.component.i";

export function sendMessageInPlayerRoom(
  roomId: string,
  isYouSend: boolean,
  systemMessage_1?: string,
  systemMessage_2?: string
) {
  // systemMessage_1 is your received message
  // systemMessage_2 is other received message
  const $incomingMessage = document.querySelector(
    "#player-settings-main-message-type input[type='text']"
  ) as HTMLInputElement;

  let message = systemMessage_1 || $incomingMessage.value;
  if (message.trim() === "") return;

  // create new bubble message
  const $div = document.createElement("div");
  const $newBubbleMessage = document.createElement("span");
  const $bubbleMessageContainer = document.querySelector("#player-settings-main-message-display");

  if (isYouSend) $div.classList.add("right");
  $newBubbleMessage.classList.add("bubble-message");
  $newBubbleMessage.innerHTML = message;
  $div.appendChild($newBubbleMessage);
  $bubbleMessageContainer.appendChild($div);

  // toggle scroll bar
  const $messageContainer = document.getElementById("player-settings-main-message-display");
  $messageContainer.scrollTop = $messageContainer.scrollHeight;

  // send message to other player
  if (isYouSend) sendMessage(roomId, systemMessage_2 || message);

  // clear input
  if (isYouSend) $incomingMessage.value = "";
}

export default function PlayerSettingsBarComponent({ roomId }: PlayerSettingsBarProps) {
  useEffect(() => {
    socket.on("incoming-chat", ({ message }) => {
      sendMessageInPlayerRoom(roomId, false, message);
    });

    socket.on("surrendered", ({}) => {
      sendMessageInPlayerRoom(roomId, false, "Your opponent surrendered!");

      (document.querySelector("#board-container") as HTMLElement).style.cursor = "wait";
      document.querySelectorAll(".chessman").forEach((e: any) => {
        e.style.pointerEvents = "none";
      });

      sendMessageInPlayerRoom(roomId, false, "<a href=''>Click here to continue</a>");
    });

    socket.on("disconnected", ({}) => {
      sendMessageInPlayerRoom(roomId, false, "Your opponent has left the game...");

      (document.querySelector("#board-container") as HTMLElement).style.cursor = "wait";
      document.querySelectorAll(".chessman").forEach((e: any) => {
        e.style.pointerEvents = "none";
      });

      sendMessageInPlayerRoom(roomId, false, "<a href=''>Click here to continue</a>");
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
    const $button = document.querySelectorAll("#player-settings-tabs-container button");
    $button.forEach((elem: any) => {
      elem.classList.remove("active");
    });

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

      <div id="player-settings-action" className="player-settings-tab" style={{ display: "none" }}>
        <li
          onClick={() => {
            sendMessageInPlayerRoom(roomId, false, "You surrendered!");
            switchTab("player-settings-main");
            document.querySelector("#player-settings-tabs-container button").classList.add("active");
            socket.emit("surrender");
          }}
        >
          Surrender
        </li>
        <li
          onClick={() => {
            sendMessageInPlayerRoom(roomId, false, "empty");
            Redirect.toRoom();
          }}
        >
          Leave
        </li>
      </div>
    </div>
  );
}
