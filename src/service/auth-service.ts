import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { IJWTPayload } from "../@types/user";
import { BizCardsError } from "../error/biz-cards-error";
import mongoose from "mongoose";
const authService = {
    hashPassword: (plainTextPassword: string, rounds = 12) => {
        return bcrypt.hash(plainTextPassword, rounds);
    },

    validatePassword: (plainTextPassword: string, hash: string) => {
        return bcrypt.compare(plainTextPassword, hash);
    },

    generateJWT: (payload: IJWTPayload) => {
        const secret = process.env.JWT_SECRET!;
        return jwt.sign(payload, secret);
    },

    verifyJWT: (token: string) => {
        try {
            const secret = process.env.JWT_SECRET!;
            const payload = jwt.verify(token, secret);
            return payload as IJWTPayload & { iat: number };
        } catch (err) {
            throw new BizCardsError("token is invalid", 400);
        }
    },

    validId: (id: string) => {
        const valid = mongoose.Types.ObjectId.isValid(id);
        if (!valid) throw new BizCardsError("id is invalid", 400);
        return valid;
    },
};
export { authService as auth };
