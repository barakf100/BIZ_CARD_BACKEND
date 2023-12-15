import Joi from "joi";
import { passRegex } from "./patterns";
import { ILogin } from "../@types/user";

const schema = Joi.object<ILogin>({
    email: Joi.string().email().required(),
    password: Joi.string().pattern(passRegex).required(),
});

export { schema as joiLoginSchema };
