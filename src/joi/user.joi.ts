import Joi from "joi";
import { IAddress, IImage, IName, IUser } from "../@types/user";
import { passRegex, phoneRegex } from "./patterns";

const schema = Joi.object<IUser>({
    name: Joi.object<IName>({
        first: Joi.string().min(2).max(20).required(),
        middle: Joi.string().min(2).max(20).allow(""),
        last: Joi.string().min(2).max(20).required(),
    }).required(),
    address: Joi.object<IAddress>({
        state: Joi.string().min(2).max(50).allow(""),
        country: Joi.string().min(2).max(50).required(),
        city: Joi.string().min(2).max(50).required(),
        street: Joi.string().min(2).max(100).required(),
        houseNumber: Joi.number().min(0).max(50000).required(),
        Zip: Joi.string().min(1).max(30),
    }).required(),
    image: Joi.object<IImage>({
        alt: Joi.string().min(4).max(200).required(),
        src: Joi.string().min(12).max(200).required(),
    }),
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .min(5),
    isBusiness: Joi.boolean().required(),
    password: Joi.string().min(7).max(20).pattern(passRegex).messages({
        "string.pattern.base": "pass rules",
        "string.empty": "pass empty",
    }),

    phone: Joi.string()
        .pattern(phoneRegex)
        .messages({
            "string.pattern.base": "phone rules",
            "string.empty": "phone empty",
        })
        .required(),
});
export { schema as joiUserSchema };
