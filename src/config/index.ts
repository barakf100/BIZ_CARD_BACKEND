import { config } from "dotenv";
import { Logger } from "../logs-message/logger";
import chalk from "chalk";

const configDotEnv = () => {
    config({ path: `src/config/.env` });
    const mode = process.env.NODE_ENV;
    Logger.info(`app is running in ${chalk.underline.bgWhite(mode)} mode`);
    config({ path: `src/config/${mode}.env` });
};
export default configDotEnv;
export { configDotEnv };
