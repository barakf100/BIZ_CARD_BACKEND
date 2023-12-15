import { Schema } from "mongoose";
import { IUser } from "../../@types/user";
import { nameSchema } from "./name-schema";
import { addressSchema } from "./address-schema";
import { imageSchema } from "./image-schema";

const userSchema = new Schema<IUser>({
    name: nameSchema,
    address: addressSchema,
    image: { type: imageSchema, required: false, default: { alt: "profile", src: "find url" } },
    phone: { required: true, type: "string", minlength: 9, maxlength: 15 },
    email: { required: true, type: "string", minlength: 7, maxlength: 20, unique: true },
    password: { required: true, type: "string" /*see length in demands*/ },
    createdAt: { type: "Date", required: false, default: new Date() },
    isAdmin: { type: "boolean", required: false, default: false },
    isBusiness: { type: "boolean", required: true },
});
export { userSchema };
