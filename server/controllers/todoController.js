import Todo from '../models/Todo.js';

export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({ user: req.user.id });
        res.json(todos);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const createTodo = async (req, res) => {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'Text is required' });

    try {
        const todo = await Todo.create({ text, user: req.user.id });
        res.status(201).json(todo);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json(updatedTodo);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteTodo = async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        if (todo.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        await todo.deleteOne();
        res.json({ message: 'Todo removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
