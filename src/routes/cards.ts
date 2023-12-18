import express from "express";
import { ICard } from "../@types/card";
import { Card } from "../database/model/card";
import { validateCard } from "../middleware/validation";
import { createCard, findOwnerCards } from "../service/card-service";
import { isBusiness } from "../middleware/is-Business";
import { extractToken } from "../middleware/is-admin";
import { getUserByJWT } from "../service/user-service";
import { isCardOwner } from "../middleware/is-card-owener";
import { isCardOwnerOrAdmin } from "../middleware/is-card-owner-or-admin";

const router = express.Router();

// get all cards - everyone
router.get("/", async (req, res) => {
    try {
        const allCards = await Card.find();
        res.json(allCards);
    } catch (err) {
        res.status(500).json({ message: "server error", err });
    }
});

// get my cards - login user
router.get("/my-cards", async (req, res) => {
    try {
        const userId = await getUserByJWT(req);
        const cards = await findOwnerCards(userId);
        res.json(cards);
    } catch (err) {
        res.status(500).json({ message: "server error", err });
    }
});

// GET card by id - everyone
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const card = await Card.findById(id);
    if (!card) return res.status(400).json({ message: "card not found" });
    res.status(200).json(card);
});

// post new card - business
router.post("/:id", isBusiness, validateCard, async (req, res) => {
    try {
        const newCard = await createCard(req.body as ICard, req.params.id);
        res.status(201).json({ message: "card saved", card: newCard });
    } catch (err) {
        res.status(400).json({ message: "Error saving card", err });
    }
});

// PUT card by id - login user who created the card
router.put("/:id", isCardOwner, async (req, res) => {
    try {
        const { id } = req.params;
        const update = await Card.findByIdAndUpdate(id, req.body, { new: true });
        if (!update) return res.status(404).json({ message: "Card not found" });
        res.status(200).json({ message: "card updated", update });
    } catch (err) {
        res.status(400).json({ message: "Error updating card", err });
    }
});

// like a card - login user
router.patch("/:id", async (req, res) => {});

// DELETE card - login user who created the card or admin
router.delete("/:id", isCardOwnerOrAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const del = await Card.findByIdAndDelete(id);
        if (!del) return res.status(404).json({ message: "Card not found" });
        res.status(200).json({ message: "card deleted", del });
    } catch (err) {
        res.status(400).json({ message: "Error deleting card", err });
    }
});

export { router as cardsRouter };
