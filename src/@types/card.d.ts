import { ObjectId } from "mongoose";
import { IAddress, IImage } from "./user";

type ICard = {
    title: string;
    subtitle: string;
    description: string;
    email: string;
    phone: string;
    web: string;
    image?: IImage;
    address: IAddress;
    _id?: string;
    userId: string;
    likes: Array<string>;
};

export { ICard };
