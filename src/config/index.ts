import { config } from "dotenv";
import { Logger } from "../logs-message/logger";

const configDotEnv = () => {
    config({ path: `src/config/.env` });
    const mode = process.env.NODE_ENV;
    Logger.info(`app is running in ${mode} mode`);
    config({ path: `src/config/${mode}.env` });
};

export default configDotEnv;
export { configDotEnv };
