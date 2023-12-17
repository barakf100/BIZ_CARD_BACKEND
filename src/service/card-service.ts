import { ICard } from "../@types/card";
import { Card } from "../database/model/card";

const createCard = async (cardData: ICard, id: string) => {
    const card = new Card(cardData);
    card.userId = id;
    return card.save();
};

export { createCard };
