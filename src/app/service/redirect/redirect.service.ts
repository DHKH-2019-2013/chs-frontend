import { socket } from "../socket/socket.service";

export class Redirect {
  static toHome() {
    location.href = "/";
  }

  static toRoom() {
    location.href = "/lobby";
  }

  static toPlayerBoard() {
    location.href = "/player";
  }

  static toBotBoard() {
    location.href = "/bot";
  }

  static toNewRoom(roomId: string, playerName: string) {
    location.href = `/player?roomId=${roomId}&name=${playerName}`;
  }

  static toTest() {
    socket.emit("test");
  }
}
