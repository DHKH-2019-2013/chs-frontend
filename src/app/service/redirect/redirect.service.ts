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
}
