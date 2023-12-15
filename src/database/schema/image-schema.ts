import { Schema } from "mongoose";
import { IImage } from "../../@types/user";

const imageSchema = new Schema<IImage>({
    alt: { type: String, required: true, minlength: 4, maxlength: 200 },
    src: { type: String, required: true, minlength: 12, maxlength: 200 },
});
export { imageSchema };
