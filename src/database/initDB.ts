import { auth } from "../service/auth-service";
import { User } from "./model/user";
import { users } from "./initDB/usersInit";

const initDB = async () => {
    const countUsers = await User.countDocuments();
    if (countUsers != 0) return;

    for (let user of users) {
        user.password = await auth.hashPassword(user.password);
        const saved = await new User(user).save();
    }

    // add 3 users
    // add 3 cards
};

export default initDB;
