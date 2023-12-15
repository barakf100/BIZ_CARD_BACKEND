import Joi from "joi";
import { IAddress, IImage, IName } from "../@types/user";
import { passRegex, phoneRegex } from "./patterns";
import { ICard } from "../@types/card";

const schema = Joi.object<ICard>({
    title: Joi.string().min(3).max(20).required(),
    subtitle: Joi.string().min(3).max(20).allow(""),
    description: Joi.string().min(3).max(50).allow(""),
    web: Joi.string().min(9).max(50).allow(""),
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
    phone: Joi.string()
        .pattern(phoneRegex)
        .messages({
            "string.pattern.base": "phone rules",
            "string.empty": "phone empty",
        })
        .required(),
});
export { schema as joiCardSchema };
