// import React, { useState } from 'react'
// import '../App.css'
// import TodoInput from '../components/TodoInput';
// import TodoList from '../components/TodoList';
// import FilterButton from '../components/FilterButton';
// // import TodoItem from '../components/TodoItem';

// const Home = () => {

//     const [todos, setTodos] = useState([]);
//     const [filter, setFilter] = useState("All");

//     // const addTodo = (text) => {
//     //     setTodos([...todos, { id: Date.now(), text, completed: false }]);
//     // };

//     const addTodo = (text, dueDate) => {
//         setTodos([
//             ...todos,
//             {
//                 id: Date.now(),
//                 text,
//                 dueDate,
//                 completed: false
//             }
//         ]);
//     };

//     const toggleTodo = (id) => {
//         setTodos(
//             todos.map((todo) =>
//                 todo.id === id ? { ...todo, completed: !todo.completed } : todo
//             )
//         );
//     };

//     const deleteTodo = (id) => {
//         setTodos(todos.filter((todo) => todo.id !== id));
//     };

//     const editTodo = (id, newText) => {
//         setTodos(
//             todos.map((todo) =>
//                 todo.id === id ? { ...todo, text: newText } : todo
//             )
//         );
//     };

//     const filteredTodos = todos.filter((todo) => {
//         if (filter === "Completed") return todo.completed;
//         if (filter === "Incomplete") return !todo.completed;
//         return true;
//     });

//     return (
//         <div className="home-container">
//             <h2 className="todo-title">✅ My Todo-s</h2>
//             <TodoInput addTodo={addTodo} />
//             <FilterButton filter={filter} setFilter={setFilter} />
//             <TodoList
//                 todos={filteredTodos}
//                 toggleTodo={toggleTodo}
//                 deleteTodo={deleteTodo}
//                 editTodo={editTodo}
//             />
//         </div>
//     );
// };

// export default Home;


import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTodos, addTodo, updateTodo, deleteTodo } from "../redux/todosSlice";
import '../App.css'

const Home = () => {
    const dispatch = useDispatch();
    const { items, loading, error } = useSelector((state) => state.todos);
    const [text, setText] = useState("");

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const handleAdd = (e) => {
        e.preventDefault();
        if (text.trim()) {
            dispatch(addTodo(text));
            setText("");
        }
    };

    const handleToggle = (id, completed) => {
        dispatch(updateTodo({ id, completed: !completed }));
    };

    const handleDelete = (id) => {
        dispatch(deleteTodo(id));
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>My Todos</h1>

            <form onSubmit={handleAdd}>
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Add new todo"
                />
                <button type="submit">Add</button>
            </form>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}

            <ul>
                {items.map((todo) => (
                    <li key={todo._id}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleToggle(todo._id, todo.completed)}
                        />
                        {todo.text}
                        <button onClick={() => handleDelete(todo._id)}>❌</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Home;
