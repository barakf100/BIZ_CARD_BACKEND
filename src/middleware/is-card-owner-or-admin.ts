import { RequestHandler } from "express";
import { getUserByJWT } from "../service/user-service";
import { extractToken } from "./is-admin";
import { auth } from "../service/auth-service";
import { User } from "../database/model/user";
import { Card } from "../database/model/card";
import { BizCardsError } from "../error/biz-cards-error";

const isCardOwnerOrAdmin: RequestHandler = async (req, res, next) => {
    try {
        auth.validId(req.params.id);
        const userId = await getUserByJWT(req); // user id
        const card = await Card.findById(req.params.id); // card id
        if (!card) throw new BizCardsError("card not found", 400);
        const token = extractToken(req);
        const { email } = auth.verifyJWT(token);
        const user = await User.findOne({ email });
        const isAdmin = user?.isAdmin;
        console.error("user:", userId._id.toString());
        console.error("card:", card);
        if (userId._id == card.userId) return next();
        else if (isAdmin) {
            next();
        } else {
            return res.status(401).json({ message: "You are not this card owner or an admin" });
        }
    } catch (err) {
        next(err);
    }
};

export { isCardOwnerOrAdmin };
