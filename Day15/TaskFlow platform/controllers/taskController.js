import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, priority, assignedTo, team } = req.body;

    const task = await Task.create({
      title,
      description,
      priority,
      assignedTo,
      team,
      createdBy: req.user.id
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const { teamId, my } = req.query;
    let filter = {};

    if (teamId) filter.team = teamId;
    if (my) filter.assignedTo = req.user.id;

    const tasks = await Task.find(filter)
      .populate("assignedTo", "name email")
      .populate("team", "name");

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateTaskStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["todo", "inprogress", "review", "done"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
