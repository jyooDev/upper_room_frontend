import Logger from "../utils/logger";

const useLogger = (filePath: string) => {
  return new Logger(filePath);
};

export default useLogger;
