import express from "express";
import authRoutes from "./auth.route.js";
import coversationRoutes from "./conversation.route.js";
import userRoutes from "./user.route.js";
import messageRoutes from "./message.route.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/conversation", coversationRoutes);
router.use("/message", messageRoutes);
router.use("/user", userRoutes);

export default router;
