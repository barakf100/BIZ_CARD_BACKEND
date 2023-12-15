import { Schema } from "mongoose";
import { IAddress } from "../../@types/user";

const addressSchema = new Schema<IAddress>({
    city: { type: String, required: true, minlength: 2, maxlength: 50 },
    country: { type: String, required: true, minlength: 2, maxlength: 50 },
    state: { type: String, required: false, default: "", minlength: 0, maxlength: 50 },
    street: { type: String, required: true, minlength: 2, maxlength: 100 },
    houseNumber: { type: Number, required: true, minlength: 1, maxlength: 999999 },
    Zip: { type: String, required: false, default: "0", minlength: 1, maxlength: 30 },
});
export { addressSchema };
