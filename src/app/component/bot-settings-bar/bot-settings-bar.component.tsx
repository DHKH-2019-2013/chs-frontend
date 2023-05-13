import React, { useEffect } from "react";
import { Redirect } from "../../service/redirect/redirect.service";
import { BotSettingsBarProps } from "./bot-settings-bar.component.i";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faBackward, faForward, faRotateRight } from "@fortawesome/free-solid-svg-icons";

export function sendMessageInBotRoom(systemMessage: string, isYouSend: boolean) {
  systemMessage = systemMessage.trim();
  if (systemMessage === "") return;

  // create new bubble message
  const $div = document.createElement("div");
  const $newBubbleMessage = document.createElement("span");
  const $bubbleMessageContainer = document.querySelector("#bot-settings-bar-history");

  if (isYouSend) $div.classList.add("right");
  $newBubbleMessage.classList.add("bubble-message");
  $newBubbleMessage.textContent = systemMessage;
  $div.appendChild($newBubbleMessage);
  $bubbleMessageContainer.appendChild($div);

  // toggle scroll bar
  const $messageContainer = document.querySelector("#bot-settings-bar-history");
  $messageContainer.scrollTop = $messageContainer.scrollHeight;
}

export default function BotSettingsBarComponent({ toggleChangeBoardHistory }: BotSettingsBarProps) {
  useEffect(() => {
    const $difficultyButtons = document.querySelectorAll("#difficulty-list button");
    $difficultyButtons.forEach((elem) => {
      elem.addEventListener("click", () => {
        $difficultyButtons.forEach((elem) => {
          elem.classList.remove("difficulty-active");
        });
        elem.classList.add("difficulty-active");
        sendMessageInBotRoom(`You change bot's difficulty to [${elem.textContent}]`, false);
      });
    });
  });

  return (
    <div id="bot-settings-bar">
      <div id="bot-settings-bar-difficulty">
        <h3>Difficulty</h3>
        <div id="difficulty-list">
          <button data-intelligence={500}>Easy</button>
          <button data-intelligence={1000} className="difficulty-active">
            Medium
          </button>
          <button data-intelligence={1500}>Hard</button>
          <button data-intelligence={2000}>Expert</button>
          <button data-intelligence={2500}>Champion</button>
        </div>
      </div>
      <div id="bot-settings-bar-history">
        <div>
          <span className="bubble-message">Welcome player!</span>
        </div>
      </div>
      <div id="bot-settings-bar-action">
        <button onClick={Redirect.toHome}>
          <FontAwesomeIcon icon={faHouse} size="lg" />
        </button>
        <button
          id="prev-move-button"
          onClick={() => {
            toggleChangeBoardHistory("prev");
          }}
        >
          <FontAwesomeIcon icon={faBackward} size="lg" />
        </button>
        <button
          id="next-move-button"
          onClick={() => {
            toggleChangeBoardHistory("next");
          }}
        >
          <FontAwesomeIcon icon={faForward} size="lg" />
        </button>
        <button
          onClick={() => {
            Redirect.toBotBoard(true);
          }}
        >
          <FontAwesomeIcon icon={faRotateRight} size="lg" />
        </button>
      </div>
    </div>
  );
}
