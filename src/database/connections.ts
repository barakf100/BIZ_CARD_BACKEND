import mongoose from "mongoose";
import initDB from "./initDB";
import { error } from "console";

const connect = async () => {
    try {
        // read the connection string from the config
        const connectionString = process.env.DB_CONNECTION_STRING;
        if (!connectionString) {
            console.error("connection string failed");
            return;
        }
        // connect to database
        await mongoose.connect(connectionString);
        console.log("DB connected");
        // initial database
        await initDB();
    } catch (error) {
        console.log(error);
    }
};
export default connect;
