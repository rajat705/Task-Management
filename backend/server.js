const express = require("express");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 5000;
const TASKS_FILE = "tasks.json";

app.use(cors());
app.use(bodyParser.json());

// Load tasks
const loadTasks = () => {
    if (!fs.existsSync(TASKS_FILE)) return [];
    return JSON.parse(fs.readFileSync(TASKS_FILE));
};

// Save tasks
const saveTasks = (tasks) => {
    fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
};

// GET all tasks
app.get("/tasks", (req, res) => {
    res.json(loadTasks());
});

// POST a new task
app.post("/tasks", (req, res) => {
    const tasks = loadTasks();
    const newTask = { id: Date.now(), title: req.body.title, description: req.body.description || "", completed: false };
    tasks.push(newTask);
    saveTasks(tasks);
    res.status(201).json(newTask);
});

// PUT update task
app.put("/tasks/:id", (req, res) => {
    const tasks = loadTasks();
    const taskIndex = tasks.findIndex((task) => task.id == req.params.id);
    if (taskIndex === -1) return res.status(404).json({ message: "Task not found" });

    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    saveTasks(tasks);
    res.json(tasks[taskIndex]);
});

// DELETE a task
app.delete("/tasks/:id", (req, res) => {
    let tasks = loadTasks();
    tasks = tasks.filter((task) => task.id != req.params.id);
    saveTasks(tasks);
    res.status(204).send();
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
