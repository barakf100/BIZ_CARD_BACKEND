import { Router } from "express";
import { ILogin, IUser } from "../@types/user";
import { User } from "../database/model/user";
import { validateLogin, validateRegistration } from "../middleware/validation";
import { createUser, validateUser } from "../service/user-service";
import { isAdmin } from "../middleware/is-admin";
import { isAdminOrUser } from "../middleware/is-admin-or-user";
import { isUser } from "../middleware/is_user";
import { auth } from "../service/auth-service";

const router = Router();

// register new user
router.post("/", validateRegistration, async (req, res, next) => {
    try {
        const saved = await createUser(req.body as IUser);
        res.status(201).json({ message: "user saved", user: saved });
    } catch (err) {
        next(err);
    }
});

// login user
router.post("/login", validateLogin, async (req, res, next) => {
    try {
        const { email, password } = req.body as ILogin;
        const jwt = await validateUser(email, password);
        res.json(jwt);
    } catch (err) {
        next(err);
    }
});

// admin get all users
router.get("/", isAdmin, async (req, res, next) => {
    try {
        const allUsers = await User.find();
        res.json(allUsers);
    } catch (err) {
        next(err);
    }
});

// admin get user by id , user get himself
router.get("/:id", isAdminOrUser, async (req, res, next) => {
    try {
        const user = (await User.findById(req.params.id).lean()) as IUser;
        const { password, ...rest } = user;
        res.json({ user: rest });
    } catch (err) {
        next(err);
    }
});

// user update himself
router.put("/:id", isUser, validateRegistration, async (req, res, next) => {
    req.body.password = await auth.hashPassword(req.body.password);
    const saved = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
    res.json(saved);
});

// user update is business
router.patch("/:id", isUser, async (req, res, next) => {
    const { isBusiness, ...otherFields } = req.body;
    if (Object.keys(otherFields).length > 0) {
        return res.status(400).json({ message: "Only the isBusiness field can be updated." });
    }
    if (isBusiness === undefined) {
        return res.status(400).json({ message: "isBusiness field is required." });
    }
    const update = await User.findByIdAndUpdate({ _id: req.params.id }, { isBusiness }, { new: true });
    res.json(update);
});

// admin delete any user , user delete himself
router.delete("/:id", isAdminOrUser, async (req, res, next) => {
    try {
        const deleted = await User.findByIdAndDelete(req.params.id);
        res.json({ message: "user deleted", deleted });
    } catch (err) {
        next(err);
    }
});

export { router as usersRouter };
