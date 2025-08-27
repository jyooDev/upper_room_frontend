import AppConfig from "./app.config.json";

class Config {
  SERVER_URL: string;
  APP_MODE: keyof typeof AppConfig.SERVER;
  LANGUAGES: string[];
  CURRENT_LANGUAGE: string;

  constructor() {
    this.APP_MODE = AppConfig.APP_MODE as keyof typeof AppConfig.SERVER;
    this.SERVER_URL = AppConfig.SERVER[this.APP_MODE];
    this.LANGUAGES = AppConfig.LANGUAGES;
    this.CURRENT_LANGUAGE = AppConfig.CURRENT_LANG;
  }

  get serverUrl() {
    return this.SERVER_URL;
  }
}

export default new Config();
