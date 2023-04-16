import { socket } from "../../service/socket/socket.service";

export function joinRoom(roomId: string, name: string) {
  socket.emit("join-board", { roomId, name });
}

export function sendPlayerMove(
  roomId: string,
  fen: string,
  move: string,
  isCheckmate: boolean,
  promotionUnit?: string
) {
  socket.emit("update-move", { roomId, fen, move, isCheckmate, promotionUnit });
}

export function sendMessage(roomId: string, message: string) {
  socket.emit("chat", { roomId, message });
}
