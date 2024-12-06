import express, { Request, Response, NextFunction, Router } from "express";
import { login, getUsers, getAdmins } from "../controllers/userController";
import { auth } from "../middlewares/auth";
import { uploadAssignment } from "../controllers/userController";
import User from "../models/User"; 
import generateToken from "../utils/token"; 
import multer from "multer";

const router = express.Router();

router.post(
    "/register",
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            console.log("register..");

            const { username, password, role } = req.body;

            if (!username || !password || !role) {
                res.status(400).json({ error: "Missing required fields" });
                return;
            }

            const existingUser = await User.findOne({ username });
            if (existingUser) {
                res.status(400).json({ error: "User already exists" });
                return;
            }

            const user = new User({ username, password, role });
            await user.save();

            const token = generateToken(user);

            res.status(201).json({ token });
        } catch (error) {
            console.error(error);
            next(error);
        }
    }
);

router.post(
    "/login",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            console.log("Login request received...");
            login(req, res).catch(next);
        } catch (error) {
            next(error);
        }
    }
);
router.get("/get-users", (req: Request, res: Response, next: NextFunction) => {
    console.log("getting users.....");
    getUsers(req, res).catch(next);
});

router.get("/get-admins", (req: Request, res: Response, next: NextFunction) => {
    console.log("getting admins.....");
    getAdmins(req, res).catch(next);
});

router.get("/protected", auth, (req, res) => {
    res.send({ message: "Access granted!" });
});

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, "uploads/");
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    }
});

const upload = multer({ storage });

router.post("/upload", auth, upload.single("file"), uploadAssignment);

export default router;
