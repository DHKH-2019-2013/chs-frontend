import { socket } from "../../service/socket/socket.service";

export function joinRoom(roomId: string, name: string) {
  socket.emit("join-board", { roomId, name });
}

export function sendPlayerMove(fen: string, playerMoved: string) {
  socket.emit("hello");
}
