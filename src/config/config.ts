import AppConfig from "./app.config.json";

class Config {
  SERVER_URL: string;
  VOICE_SERVER_URL: string;
  APP_MODE: keyof typeof AppConfig.BACKEND_SERVER;
  LANGUAGES: string[];
  CURRENT_LANGUAGE: string;

  constructor() {
    this.APP_MODE = AppConfig.APP_MODE as keyof typeof AppConfig.BACKEND_SERVER;
    this.SERVER_URL = AppConfig.BACKEND_SERVER[this.APP_MODE];
    this.VOICE_SERVER_URL = AppConfig.VOICE_SERVER[this.APP_MODE];
    this.LANGUAGES = AppConfig.LANGUAGES;
    this.CURRENT_LANGUAGE = AppConfig.CURRENT_LANG;
  }

  get serverUrl() {
    return this.SERVER_URL;
  }

  get voiceServerUrl() {
    return this.VOICE_SERVER_URL;
  }

  get languages() {
    return this.LANGUAGES;
  }

  get currentLanguage() {
    return this.CURRENT_LANGUAGE;
  }
}

export default new Config();
