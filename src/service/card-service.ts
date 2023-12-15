import { ICard } from "../@types/card";
import { Card } from "../database/model/card";

const createCard = async (cardData: ICard) => {
    const card = new Card(cardData);
    return card.save();
};

export { createCard };
