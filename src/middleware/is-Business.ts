import { Request, RequestHandler } from "express";
import { BizCardsError } from "../error/biz-cards-error";
import { auth } from "../service/auth-service";
import { User } from "../database/model/user";
import { extractToken } from "./is-admin";

const isBusiness: RequestHandler = async (req, res, next) => {
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);

    const user = await User.findOne({ email });
    const isBusiness = user?.isBusiness;
    if (isBusiness) {
        next();
    } else {
        return res.status(401).json({ message: "You are not an business account" });
    }
};

export { isBusiness };
