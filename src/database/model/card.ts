import mongoose from "mongoose";
import { userSchema } from "../schema/user-schema";
import { cardSchema } from "../schema/card-schema";

const Card = mongoose.model("card", cardSchema);

export { Card };
