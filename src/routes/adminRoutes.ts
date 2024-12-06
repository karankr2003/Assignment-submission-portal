import express from "express";
import {
    registerAdmin,
    loginAdmin,
    acceptAssignment,
    rejectAssignment,
    getAssignmentsForAdmin
} from "../controllers/adminController";
import { auth, validateAdminInput } from "../middlewares/auth";

const router = express.Router();

router.post("/register", validateAdminInput, registerAdmin);

router.post("/login", loginAdmin);
router.get("/assignments", auth, getAssignmentsForAdmin); 

router.patch("/assignments/:id/accept", auth, acceptAssignment);

router.patch("/assignments/:id/reject", auth, rejectAssignment);

export default router;
