// import express from "express";
// import Todo from "../models/Todo.js";
// import protect from "../middleware/authMiddleware.js";
const express = require("express");
// const { createTodo, getTodos, updateTodo, deleteTodo } = require("../controllers/todoController");
const Todo = require('../models/Todo')
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create task
router.post("/", protect, async (req, res) => {
    const todo = new Todo({
        text: req.body.text,
        user: req.user.id
    });
    const saved = await todo.save();
    res.json(saved);
});

// Get todos
router.get("/", protect, async (req, res) => {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
});

// Update task
router.put("/:id", protect, async (req, res) => {
    const todo = await Todo.findOneAndUpdate(
        { _id: req.params.id, user: req.user.id },
        { completed: req.body.completed },
        { new: true }
    );
    res.json(todo);
});

// Delete task
router.delete("/:id", protect, async (req, res) => {
    await Todo.findOneAndDelete({ _id: req.params.id, user: req.user.id });
    res.json({ message: "Todo deleted" });
});

module.exports = router;
