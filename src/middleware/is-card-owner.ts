import { RequestHandler } from "express";
import { getUserByJWT } from "../service/user-service";
import { findOwnerCards } from "../service/card-service";

const isCardOwner: RequestHandler = async (req, res, next) => {
    const userId: string = await getUserByJWT(req); // user id
    const cardOwner = await findOwnerCards(req.params.id); // card id
    if (userId == cardOwner) return next();
    else res.status(401).json({ message: "you are not this card owner" });
};
export { isCardOwner };
