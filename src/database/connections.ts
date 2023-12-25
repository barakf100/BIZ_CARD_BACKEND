import mongoose from "mongoose";
import initDB from "./initDB";
import chalk from "chalk";
import { Logger } from "../logs-message/logger";

const connect = async () => {
    try {
        // read the connection string from the config
        const connectionString = process.env.DB_CONNECTION_STRING;
        if (!connectionString) {
            Logger.error("connection string failed");
            return;
        }
        // connect to database
        await mongoose.connect(connectionString);
        console.log(chalk.green("DB connected successfully !!"));
        // initial database
        await initDB();
    } catch (error) {
        Logger.error(error);
    }
};
export default connect;
