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
import { fetchTodos, createTodo, updateTodo, deleteTodo } from "../redux/todosSlice";
import TodoInput from "../components/TodoInput";
import TodoList from "../components/TodoList";
import FilterButton from "../components/FilterButton";
import "../App.css";

const Home = () => {
    const dispatch = useDispatch();
    const { items: todos } = useSelector((state) => state.todos);
    const [filter, setFilter] = useState("All");

    useEffect(() => {
        dispatch(fetchTodos());
    }, [dispatch]);

    const addTodo = (text, dueDate) => {
        dispatch(createTodo({ text, dueDate }));
    };

    const toggleTodo = (id, completed) => {
        dispatch(updateTodo({ id, updates: { completed: !completed } }));
    };

    const deleteTodoHandler = (id) => {
        dispatch(deleteTodo(id));
    };

    const editTodo = (id, newText) => {
        dispatch(updateTodo({ id, updates: { text: newText } }));
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
                toggleTodo={(id) => {
                    const todo = todos.find((t) => t._id === id);
                    toggleTodo(id, todo.completed);
                }}
                deleteTodo={deleteTodoHandler}
                editTodo={editTodo}
            />
        </div>
    );
};

export default Home;
