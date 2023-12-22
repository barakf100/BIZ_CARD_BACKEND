import { IUser } from "../@types/user";
import { User } from "../database/model/user";
import { auth } from "./auth-service";
import { BizCardsError } from "../error/biz-cards-error";
import { Request } from "express";
import { extractToken } from "../middleware/is-admin";
import mongoose from "mongoose";

// creates new User and hashes password
const createUser = async (userData: IUser) => {
    const user = new User(userData);
    user.password = await auth.hashPassword(user.password);
    return user.save();
};

const validateUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });

    if (!user) throw new BizCardsError("Invalid Email", 401);

    const isPasswordValid = await auth.validatePassword(password, user.password);
    if (!isPasswordValid) throw new BizCardsError("Invalid password", 401);
    const jwt = auth.generateJWT({ email });
    return { jwt };
};

const getUserByJWT = async (req: Request) => {
    const JWT = extractToken(req);
    const { email } = auth.verifyJWT(JWT);
    const { _id } = await User.findOne({ email });
    return _id;
};

const isValidId = (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BizCardsError("invalid id", 400);
    }
};
export { createUser, validateUser, getUserByJWT, isValidId };
