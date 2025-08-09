import React, { useState } from 'react'
import '../App.css'
import TodoInput from '../components/TodoInput';
import TodoList from '../components/TodoList';
import FilterButton from '../components/FilterButton';
// import TodoItem from '../components/TodoItem';

const Home = () => {

    const [todos, setTodos] = useState([]);
    const [filter, setFilter] = useState("All");

    // const addTodo = (text) => {
    //     setTodos([...todos, { id: Date.now(), text, completed: false }]);
    // };

    const addTodo = (text, dueDate) => {
        setTodos([
            ...todos,
            {
                id: Date.now(),
                text,
                dueDate,
                completed: false
            }
        ]);
    };

    const toggleTodo = (id) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const editTodo = (id, newText) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, text: newText } : todo
            )
        );
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === "Completed") return todo.completed;
        if (filter === "Incomplete") return !todo.completed;
        return true;
    });

    return (
        <div className="home-container">
            <h2 className="todo-title">✅ My Todo-s</h2>
            <TodoInput addTodo={addTodo} />
            <FilterButton filter={filter} setFilter={setFilter} />
            <TodoList
                todos={filteredTodos}
                toggleTodo={toggleTodo}
                deleteTodo={deleteTodo}
                editTodo={editTodo}
            />
        </div>
    );
};

export default Home;
