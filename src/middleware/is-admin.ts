import { Request, RequestHandler } from "express";
import { BizCardsError } from "../error/biz-cards-error";
import { auth } from "../service/auth-service";
import { User } from "../database/model/user";

const extractToken = (req: Request) => {
    const authHeader = req.header("Authorization");
    let jwt = "";
    if (authHeader && authHeader.length > 7 && authHeader.toLowerCase().startsWith("bearer")) {
        return authHeader.substring(7);
    }
    throw new BizCardsError("token is missing", 400);
};

const isAdmin: RequestHandler = async (req, res, next) => {
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);

    const user = await User.findOne({ email });
    const isAdmin = user?.isAdmin;
    if (isAdmin) {
        next();
    } else {
        return res.status(401).json({ message: "You are not an admin" });
    }
};

export { isAdmin, extractToken };
