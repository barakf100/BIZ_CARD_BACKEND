import { Router } from "express";
import { ILogin, IUser } from "../@types/user";
import { User } from "../database/model/user";
import { validateLogin, validateRegistration } from "../middleware/validation";
import { createUser, isValidId, validateUser } from "../service/user-service";
import { isAdmin } from "../middleware/is-admin";
import { isAdminOrUser } from "../middleware/is-admin-or-user";
import { isUser } from "../middleware/is_user";
import { auth } from "../service/auth-service";
import { BizCardsError } from "../error/biz-cards-error";

const router = Router();
// TODO: check when log get undefined status
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
        isValidId(req.params.id);
        const userDoc = await User.findById(req.params.id);
        if (!userDoc) {
            throw new BizCardsError("user not found", 401);
        }
        const user = userDoc.toObject() as IUser;
        const { password, ...rest } = user;
        res.json({ user: rest });
    } catch (err) {
        next(err);
    }
});

// user update himself
router.put("/:id", isUser, validateRegistration, async (req, res, next) => {
    try {
        req.body.password = await auth.hashPassword(req.body.password);
        const saved = await User.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.json(saved);
    } catch (err) {
        next(err);
    }
});

// user update is business
router.patch("/:id", isUser, async (req, res, next) => {
    try {
        const { isBusiness, ...otherFields } = req.body;
        if (Object.keys(otherFields).length > 0) {
            throw new BizCardsError("Only the isBusiness field can be updated.", 400);
        }
        if (typeof isBusiness != "boolean") {
            throw new BizCardsError("isBusiness field must be Boolean.", 400);
        }
        const update = await User.findByIdAndUpdate({ _id: req.params.id }, { isBusiness }, { new: true });
        res.json(update);
    } catch (err) {
        next(err);
    }
});

// admin delete any user , user delete himself
router.delete("/:id", isAdminOrUser, async (req, res, next) => {
    try {
        isValidId(req.params.id);
        const deleted = await User.findByIdAndDelete(req.params.id);
        if (!deleted) {
            throw new BizCardsError("user not found", 400);
        }
        res.json({ message: "user deleted", deleted });
    } catch (err) {
        next(err);
    }
});

export { router as usersRouter };
