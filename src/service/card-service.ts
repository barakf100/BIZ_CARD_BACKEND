import { ICard } from "../@types/card";
import { Card } from "../database/model/card";
import { BizCardsError } from "../error/biz-cards-error";

const createCard = async (cardData: ICard, id: string) => {
    const card = new Card(cardData);
    card.userId = id;
    return card.save();
};
const findOwnerCards = async (id: string) => {
    const cards = await Card.find({ userId: id });
    return cards;
};
const likedOrNot = async (cardId: string, userId: string) => {
    const card = await Card.findById(cardId);
    if (!card) throw new BizCardsError("card not found", 400);
    const userIdIndex = card.likes.indexOf(userId);
    let arr = card.likes;
    if (userIdIndex === -1) {
        arr.push(userId);
    } else {
        arr.splice(userIdIndex, 1);
    }
    await card.updateOne({ likes: arr });
    return userIdIndex;
};
export { createCard, findOwnerCards, likedOrNot };
