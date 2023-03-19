import { AppConfig, IConfig } from "../app/app.config";
import { IHttpConfig } from "./http.config.i";

export class HttpConfig {
  private appConfig: IConfig;

  constructor() {
    this.appConfig = new AppConfig();
  }

  getConfig(): IHttpConfig {
    return {
      bff: {
        initializeChessBoard: `${this.appConfig.bffBaseUrl}/initialize-chess-board`,
        getMove: `${this.appConfig.bffBaseUrl}/move`,
      },
    };
  }
}
