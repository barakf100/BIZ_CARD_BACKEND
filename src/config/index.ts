import { config } from "dotenv";
import path from "path";

const configDotEnv = () => {
    config({ path: `src/config/.env` });
    const mode = process.env.NODE_ENV;
    console.log(`app is running in ${mode} mode`);
    config({ path: `src/config/${mode}.env` });
};

export default configDotEnv;
export { configDotEnv };
