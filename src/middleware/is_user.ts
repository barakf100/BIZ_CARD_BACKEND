import { Request, RequestHandler } from "express";
import { BizCardsError } from "../error/biz-cards-error";
import { auth } from "../service/auth-service";
import { User } from "../database/model/user";
import { extractToken } from "./is-admin";
import { IUser } from "../@types/user";
import { getUserByJWT } from "../service/user-service";

const isUser: RequestHandler = async (req, res, next) => {
    try {
        const token = extractToken(req);
        const { email } = auth.verifyJWT(token);
        const { id } = req.params;
        const user = (await User.findOne({ email }).lean()) as IUser;
        req.user = user;
        if (!user) throw new BizCardsError("user not found", 401);
        if (id == user?._id) return next();
        throw new BizCardsError("You are not a user", 401);
    } catch (err) {
        next(err);
    }
};
const authIsUser: RequestHandler = async (req, res, next) => {
    try {
        auth.validId(req.params.id);
        const user = await getUserByJWT(req);
        if (!user) throw new BizCardsError("user not found", 401);
        req.user = user;
        next();
    } catch (err) {
        next(err);
    }
};

export { isUser, authIsUser };
