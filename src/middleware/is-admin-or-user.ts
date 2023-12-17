import { Request, RequestHandler } from "express";
import { BizCardsError } from "../error/biz-cards-error";
import { auth } from "../service/auth-service";
import { User } from "../database/model/user";
import { extractToken } from "./is-admin";

const isAdminOrUser: RequestHandler = async (req, res, next) => {
    try {
        const token = extractToken(req);
        const { email } = auth.verifyJWT(token);
        const { id } = req.params;
        const user = await User.findOne({ email });
        if (!user) throw new BizCardsError("user not found", 401);
        if (id == user.id) return next();
        if (user.isAdmin) return next();
        res.status(401).json({ message: "You are not an admin" });
    } catch (err) {
        next(err);
    }
};

export { isAdminOrUser };
