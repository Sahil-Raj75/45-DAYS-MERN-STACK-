import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "../config/database.js";
import authRoutes from "./router/auth.js";
import postRoutes from "./router/posts.js";
import commentRoutes from "./model/comments.js";
import userRoutes from "./router/user.js";

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database
connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
