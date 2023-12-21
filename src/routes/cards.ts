import express from "express";
import { ICard } from "../@types/card";
import { Card } from "../database/model/card";
import { validateCard } from "../middleware/validation";
import { createCard, findOwnerCards, likedOrNot } from "../service/card-service";
import { isBusiness } from "../middleware/is-Business";
import { getUserByJWT } from "../service/user-service";
import { isCardOwner } from "../middleware/is-card-owner";
import { isCardOwnerOrAdmin } from "../middleware/is-card-owner-or-admin";
import { authIsUser, isUser } from "../middleware/is_user";
import e from "express";

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

// get my cards - logged in user
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

// post new card - business account
router.post("/", isBusiness, validateCard, async (req, res) => {
    try {
        const newCard = await createCard(req.body as ICard, req.user._id);
        res.status(201).json({ message: "card saved", card: newCard });
    } catch (err) {
        res.status(400).json({ message: "Error saving card", err });
    }
});

// PUT card by id - logged in user who created the card
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

// like a card - logged in user
router.patch("/:id", authIsUser, async (req, res, next) => {
    try {
        const success = await likedOrNot(req.params.id, req.user._id.toString());
        if (success === -1) res.status(200).json({ message: "card liked" });
        else res.status(200).json({ message: "card disliked" });
    } catch (err) {
        next(err);
    }
});

// DELETE card - logged in user who created the card or admin
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
