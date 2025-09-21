import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  status: { type: String, enum: ["todo", "inprogress", "review", "done"], default: "todo" },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  team: { type: mongoose.Schema.Types.ObjectId, ref: "Team" },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
}, { timestamps: true });

export default mongoose.model("Task", taskSchema);
