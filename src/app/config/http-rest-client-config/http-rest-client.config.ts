import { HttpService } from "../../service/http/http.service";
import { HttpConfig } from "../http-config/http.config";
import { GetInitializeChessBoardResponse } from "./http-rest-client-config.i";

export class HttpRestClientConfig {
  static async getInitializeChessBoard(): Promise<GetInitializeChessBoardResponse> {
    const initializeChessBoardUrl = new HttpConfig().getConfig().bff.initializeChessBoard;
    return await HttpService.get(initializeChessBoardUrl);
  }
}
