import { ErrorRequestHandler } from "express";
import { BizCardsError } from "../error/biz-cards-error";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
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
