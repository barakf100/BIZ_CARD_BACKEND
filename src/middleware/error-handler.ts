import { ErrorRequestHandler } from "express";
import { BizCardsError } from "../error/biz-cards-error";
import { promises } from "fs";
import { Logger } from "../logs-message/logger";
const logs = async (errorMessage: any) => {
    try {
        const date = new Date();
        const path = "./src/log";
        const data = `${date.getDate()}-${date.getMonth() + 1}`;
        const message = `logged error with status code: ${errorMessage.status}
        at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} 
        error was: ${errorMessage.message} \n`;
        await promises.appendFile(`${path}/${data}.log`, message);
    } catch (err) {
        Logger.error("error in file save", err);
    }
};

const errorHandler: ErrorRequestHandler = async (err, req, res, next) => {
    logs(err);
    if (err instanceof BizCardsError) return res.status(err.status).json({ message: err.message });

    if (err.code && err.code == 11000 && err.keyPattern && err.keyValue)
        return res.status(400).json({
            message: "duplicate key",
            property: err.keyValue,
            index: err.keyPattern,
        });

    if (err instanceof SyntaxError) return res.status(400).json({ message: "invalid JSON" });

    return res.status(500).json({ message: "server error" });
};

export { errorHandler };
