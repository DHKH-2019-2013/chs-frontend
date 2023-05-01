export class Redirect {
  static toHome() {
    location.href = "/";
  }

  static toRoom() {
    location.href = "/lobby";
  }

  static toPlayerBoard(roomId: string, name: string) {
    location.href = `/player?roomId=${roomId}&name=${name}`;
  }

  static toBotBoard() {
    location.href = "/bot";
  }

  static toNewRoom(roomId: string, playerName: string) {
    location.href = `/player?roomId=${roomId}&name=${playerName}`;
  }

  static reload() {
    location.reload();
  }
}
