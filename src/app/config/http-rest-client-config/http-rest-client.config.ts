import { HttpService } from "../../service/http/http.service";
import { HttpConfig } from "../http-config/http.config";
import {
  CheckValidMoveParams,
  CheckValidMoveResponse,
  GetInitializeChessBoardResponse,
  GetMoveParams,
  GetMoveResponse,
} from "./http-rest-client-config.i";

export class HttpRestClientConfig {
  static async getInitializeChessBoard(): Promise<GetInitializeChessBoardResponse> {
    const initializeChessBoardUrl = new HttpConfig().getConfig().bff.initializeChessBoard;
    return await HttpService.get(initializeChessBoardUrl);
  }

  static async getMove(params: GetMoveParams): Promise<GetMoveResponse> {
    const getMoveUrl = new HttpConfig().getConfig().bff.getMove;
    return await HttpService.get(getMoveUrl, { ...params });
  }

  static async checkValidMove(params: CheckValidMoveParams): Promise<CheckValidMoveResponse> {
    const getMoveUrl = new HttpConfig().getConfig().bff.checkValidMove;
    return await HttpService.get(getMoveUrl, { ...params });
  }
}
