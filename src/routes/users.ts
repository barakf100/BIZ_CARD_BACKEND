import JWT from "jsonwebtoken";
import { Router } from "express";
import { ILogin, IUser } from "../@types/user";
import { User } from "../database/model/user";
import { validateLogin, validateRegistration } from "../middleware/validaition";
import { createUser, validateUser } from "../service/user-service";

const router = Router();

router.get("/", async (req, res) => {
    // only admin can access this route
    try {
        const allUsers = await User.find();
        res.json(allUsers);
    } catch (err) {
        res.status(500).json({ message: "server error", err });
    }
});

router.post("/", validateRegistration, async (req, res, next) => {
    try {
        const saved = await createUser(req.body as IUser);
        res.status(201).json({ message: "user saved", user: saved });
    } catch (err) {
        next(err);
    }
});
router.post("/login", validateLogin, async (req, res, next) => {
    try {
        const { email, password } = req.body as ILogin;
        const jwt = await validateUser(email, password);
        res.json(jwt);
    } catch (err) {
        next(err);
    }
});

export { router as usersRouter };
