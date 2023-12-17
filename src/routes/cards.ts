import express from "express";
import { ICard } from "../@types/card";
import { Card } from "../database/model/card";
import { validateCard } from "../middleware/validation";
import { createCard } from "../service/card-service";
import { isBusiness } from "../middleware/is-Business";

const router = express.Router();

// GET /cards
router.get("/", async (req, res) => {
    try {
        const allCards = await Card.find();
        res.json(allCards);
    } catch (err) {
        res.status(500).json({ message: "server error", err });
    }
});

// GET /cards/:id
router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const card = await Card.findById(id);
    if (!card) return res.status(400).json({ message: "card not found" });
    res.status(200).json(card);
});

// POST /cards
router.post("/:id", isBusiness, validateCard, async (req, res) => {
    try {
        const newCard = await createCard(req.body as ICard, req.params.id);
        res.status(201).json({ message: "card saved", card: newCard });
    } catch (err) {
        res.status(400).json({ message: "Error saving card", err });
    }
});

// PUT /cards/:id
router.put("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const update = await Card.findByIdAndUpdate(id, req.body);
        if (!update) return res.status(404).json({ message: "Card not found" });
        res.status(200).json({ message: "card updated", update });
        res.send(`Update card with ID ${id}`);
    } catch (err) {
        res.status(400).json({ message: "Error updating card", err });
    }
});

// DELETE /cards/:id
router.delete("/:id", async (req, res) => {
    // TODO: handle delete only by owner
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
