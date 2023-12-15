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
};

export { ICard };
