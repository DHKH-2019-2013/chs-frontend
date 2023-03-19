export interface IENV {
  PORT?: number;
  BFF_BASE_URL?: string;
}

export interface IConfig {
  port: number;
  bffBaseUrl: string;
}

export class AppConfig implements IConfig {
  public port: number = 9000;
  public bffBaseUrl: string = "http://localhost:3001";

  constructor() {
    this.port = this.port;
    this.bffBaseUrl = this.bffBaseUrl;
  }
}
