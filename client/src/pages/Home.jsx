import React, { useEffect, useState } from 'react'
import { createTodo, deleteTodo, fetchTodos, updateTodo } from '../api';
import TodoItem from '../components/TodoItem';

const Home = () => {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState('');

    const loadTools = async () => {
        const { data } = await fetchTodos();
        setTodos(data);
    };

    useEffect(() => {
        loadTools();
    }, []);

    const handleAdd = async () => {
        if (!text.trim()) return;
        const { data } = await createTodo({ text });
        setTodos([...todos, data]);
        setText('');
    };

    const handleUpdate = async (id, updatedTodo) => {
        const { data } = await updateTodo(id, updatedTodo);
        setTodos(todos.map(t => (t._id === id ? data : t)));
    };

    const handleDelete = async (id) => {
        await deleteTodo(id);
        setTodos(todos.filter(t => t._id !== id));
    };

    return (
        <div className="container">
            <h1>My TODO List</h1>
            <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a task" />
            <button onClick={handleAdd}>Add</button>
            {todos.map(todo => (
                <TodoItem key={todo._id} todo={todo} onUpdate={handleUpdate} onDelete={handleDelete} />
            ))}
        </div>
    );
};

export default Home;
