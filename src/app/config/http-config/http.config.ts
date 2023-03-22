import { AppConfig, IConfig } from "../app/app.config";
import { IHttpConfig } from "./http.config.i";

export class HttpConfig {
  private appConfig: IConfig;

  constructor() {
    this.appConfig = new AppConfig();
  }

  getConfig(): IHttpConfig {
    return {
      bridge: {
        initializeChessBoard: `${this.appConfig.bridgeBaseUrl}/initialize-chess-board`,
        getMove: `${this.appConfig.bridgeBaseUrl}/move`,
        checkValidMove: `${this.appConfig.bridgeBaseUrl}/check-valid-move`,
      },
    };
  }
}
