import express from "express";
import { createTask, getTasks, updateTask, deleteTask, updateTaskStatus } from "../controllers/taskController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

// All routes need authentication
router.post("/", protect, createTask);  // protect middlewares for security purpose 
router.get("/", protect, getTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);
router.patch("/:id/status", protect, updateTaskStatus);

export default router;
