import { RequestHandler } from "express";
import { getUserByJWT } from "../service/user-service";
import { Card } from "../database/model/card";
import { BizCardsError } from "../error/biz-cards-error";
import { auth } from "../service/auth-service";

const isCardOwner: RequestHandler = async (req, res, next) => {
    try {
        auth.validId(req.params.id);
        const user = await getUserByJWT(req); // user id
        const { userId: cardOwnerId } = await Card.findById(req.params.id); // card id
        if (!cardOwnerId) throw new BizCardsError("card not found", 400);
        if (user._id == cardOwnerId) return next();
        else res.status(401).json({ message: "you are not this card owner" });
    } catch (err) {
        next(err);
    }
};
export { isCardOwner };
