import { auth } from "../service/auth-service";
import { User } from "./model/user";
import { users } from "./initDB/usersInit";
import { Card } from "./model/card";
import { cards } from "./initDB/cardInit";

const initDB = async () => {
    const countUsers = await User.countDocuments();
    const countCards = await Card.countDocuments();

    // if DB is not empty return
    if (countUsers != 0 && countCards != 0) return;

    // if Users is empty create users
    if (countUsers === 0) {
        for (let user of users) {
            user.password = await auth.hashPassword(user.password);
            const saved = await new User(user).save();
        }
    }

    // if Cards is empty create cards
    if (countCards === 0) {
        for (let card of cards) {
            const saved = await new Card(card).save();
        }
    }
};

export default initDB;
