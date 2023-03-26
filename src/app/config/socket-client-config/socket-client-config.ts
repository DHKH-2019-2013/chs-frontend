import { socket } from "../../service/socket/socket.service";

export function joinRoom(roomId: string, name: string) {
  socket.emit("join-board", { roomId, name });
}

export function sendPlayerMove(roomId: string, fen: string, move: string, isCheckmate: boolean) {
  socket.emit("update-move", { roomId, fen, move, isCheckmate });
}
