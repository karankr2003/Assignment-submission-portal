import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routes/userRoutes";
import dotenv from "dotenv";
import path from "path";
import adminRoutes from "./routes/adminRoutes"; 
console.log("Before dotenv:", process.env.JWT_SECRET);
dotenv.config();
console.log("After dotenv:", process.env.JWT_SECRET);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "login.html")); 
});

app.use(express.json());

app.get("/", (req, res) => {
});

app.use("/user", userRoutes);
app.use("/admin", adminRoutes); 

app.use(
    (
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) => {
        console.error(err.stack);
        res.status(500).send({ error: "Something went wrong!" });
    }
);

app.use((req, res, next) => {
    console.log("Path:", req.path);
    console.log("Headers:", req.headers);
    next();
});

// MongoDB connection
mongoose
    .connect("mongodb://localhost:27017/assignment_portal")
    .then(() => {
        console.log("Connected to MongoDB");
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Failed to connect to MongoDB", err);
    });

export default app;
