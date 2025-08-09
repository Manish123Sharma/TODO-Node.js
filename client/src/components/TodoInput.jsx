import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types';
import './TodoInput.css';
import { MdCalendarToday } from "react-icons/md";

const TodoInput = ({ addTodo }) => {
    const [text, setText] = useState("");
    const [dueDate, setDueDate] = useState("");
    const dateInputRef = useRef(null);

    const today = new Date().toISOString().split("T")[0];

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!text.trim()) {
            alert("Please enter a task description.");
            return;
        }
        if (!dueDate) {
            alert("Please select a due date.");
            return;
        }

        addTodo(text, dueDate); // ✅ pass separately

        setText("");
        setDueDate("");
    };

    const handleCalendarClick = () => {
        dateInputRef.current?.showPicker();
    };



    return (
        // <div className="todo-input-container">
        //     <input
        //         type="text"
        //         placeholder="Add new..."
        //         className="todo-input"
        //         value={text}
        //         onChange={(e) => setText(e.target.value)}
        //     />
        //     <button className="add-btn" onClick={handleAdd}>
        //         ADD
        //     </button>
        // </div>
        <form className="todo-input" onSubmit={handleSubmit}>
            <div className="input-wrapper">
                <input
                    type="text"
                    placeholder="Add new..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                <MdCalendarToday
                    className="calendar-icon"
                    onClick={handleCalendarClick}
                    title="Set due date"
                />
                <input
                    type="date"
                    ref={dateInputRef}
                    min={today}
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    style={{ display: "none" }}
                />
                <button type="submit" className="add-btn">ADD</button>
            </div>
        </form>
    );
};

TodoInput.propTypes = {
    addTodo: PropTypes.func.isRequired,
};

export default TodoInput;
