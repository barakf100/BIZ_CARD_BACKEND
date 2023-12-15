import { Schema } from "mongoose";
import { ICard } from "../../@types/card";
import { addressSchema } from "./address-schema";
import { imageSchema } from "./image-schema";

const cardSchema = new Schema<ICard>({
    title: { type: "string", required: true, minlength: 3, maxlength: 20 },
    subtitle: { type: "string", required: false, minlength: 3, maxlength: 20 },
    description: { type: "string", required: false, minlength: 3, maxlength: 50 },
    phone: { type: "string", required: true, minlength: 9, maxlength: 15 },
    email: { type: "string", required: true, minlength: 7, maxlength: 20 },
    web: { type: "string", required: false, minlength: 9, maxlength: 50 },
    address: addressSchema,
    image: {
        type: imageSchema,
        required: false,
        default: {
            alt: "card image",
            src: "https://cdn.pixabay.com/photo/2016/02/13/12/26/aurora-1197753_1280.jpg",
        },
    },
});

export { cardSchema };
