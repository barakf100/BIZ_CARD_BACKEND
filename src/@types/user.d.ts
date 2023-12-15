type IName = {
    first: string;
    middle?: string;
    last: string;
};
type IImage = {
    src: string;
    alt: string;
};
type IAddress = {
    state?: string;
    country: string;
    city: string;
    street: string;
    houseNumber: Number;
    Zip?: string;
};

type IUser = {
    name: IName;
    address: IAddress;
    image?: IImage;
    email: string;
    phone: string;
    password: string;
    isBusiness: boolean;
    isAdmin?: boolean;
    createdAt?: Date;
};

type ILogin = {
    email: string;
    password: string;
};
type IJWTPayload = {
    email: string;
};
export { IUser, IName, IAddress, IImage, ILogin, IJWTPayload };
