export interface RoomDB {
  roomId: string;
  players: Array<{
    id: string;
    name: string;
  }>;
}
