import { RequestHandler } from "express";
import { getUserByJWT } from "../service/user-service";
import { findOwnerCards } from "../service/card-service";
import { extractToken } from "./is-admin";
import { auth } from "../service/auth-service";
import { User } from "../database/model/user";

const isCardOwnerOrAdmin: RequestHandler = async (req, res, next) => {
    const userId: string = await getUserByJWT(req); // user id
    const cardOwner = await findOwnerCards(req.params.id); // card id
    const token = extractToken(req);
    const { email } = auth.verifyJWT(token);
    const user = await User.findOne({ email });
    const isAdmin = user?.isAdmin;
    if (userId == cardOwner) return next();
    else if (isAdmin) {
        next();
    } else {
        return res.status(401).json({ message: "You are not this card owner or an admin" });
    }
};

export { isCardOwnerOrAdmin };
