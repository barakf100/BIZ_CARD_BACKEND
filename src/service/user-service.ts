import { IUser } from "../@types/user";
import { User } from "../database/model/user";
import { auth } from "./auth-service";
import { BizCardsError } from "../error/biz-cards-error";

const createUser = async (userData: IUser) => {
    const user = new User(userData);
    user.password = await auth.hashPassword(user.password);
    return user.save();
};

const validateUser = async (email: string, password: string) => {
    const user = await User.findOne({ email });

    if (!user) throw new BizCardsError("Invalid login", 401);

    const isPasswordValid = await auth.validatePassword(password, user.password);
    if (!isPasswordValid) throw new BizCardsError("Invalid login", 401);
    const jwt = auth.generateJWT({ email });
    return { jwt };
};

export { createUser, validateUser };
