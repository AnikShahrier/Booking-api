import express from "express";
import { register, login, me } from "../controllers/auth.controller";
import { requireAuth } from "../middlewares/auth";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", requireAuth, me);

export default router;
