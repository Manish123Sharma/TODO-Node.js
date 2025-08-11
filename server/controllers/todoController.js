import Todo from '../models/Todo.js';

// @desc Get all todos for logged in user
export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id });
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc Create new task
export const createTodo = async (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Title is required" });
    }

    try {
        const todo = await Todo.create({
            title,
            user: req.user.id,
        });
        res.status(201).json(todo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc Update task
export const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });

        res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// @desc Delete task
export const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);

        if (!todo) {
            return res.status(404).json({ message: "Todo not found" });
        }

        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ message: "Not authorized" });
        }

        await todo.deleteOne();
        res.json({ message: "Todo removed" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
