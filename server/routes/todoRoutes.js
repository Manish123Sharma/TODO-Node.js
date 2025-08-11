import express from 'express';
import protect from '../middleware/authMiddleware.js';
import {
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
} from '../controllers/todoController.js';

const router = express.Router();

// All routes are protected (require valid JWT)
router.route('/')
    .get(protect, getTodos)
    .post(protect, createTodo);

router.route('/:id')
    .put(protect, updateTodo)
    .delete(protect, deleteTodo);

export default router;
