export interface IENV {
  PORT?: number;
  BRIDGE_BASE_URL?: string;
}

export interface IConfig {
  port: number;
  bridgeBaseUrl: string;
}

export class AppConfig implements IConfig {
  public port: number = 9000;
  public bridgeBaseUrl: string = "http://localhost:3001";

  constructor() {
    this.port = this.port;
    this.bridgeBaseUrl = this.bridgeBaseUrl;
  }
}
