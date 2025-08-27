class Config {
  // AppConfig: {
  //   SERVER_URL: {
  //     DEV: string,
  //     STAGING: string,
  //     PROD: string
  //   },
  //   APP_MODE: string
  // }
  SERVER_URL: string;

  constructor() {
    // this.AppConfig = AppConfig
    this.SERVER_URL = "http://localhost:8888/api";
  }

  get serverUrl() {
    return this.SERVER_URL;
  }
}

export default new Config();
