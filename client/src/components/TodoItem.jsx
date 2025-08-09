import React, { useState } from 'react';
import './TodoItem.css';
import PropTypes from 'prop-types';
import { FaInfoCircle } from 'react-icons/fa'; // for info icon

const TodoItem = ({ todo, toggleTodo, deleteTodo, editTodo }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(todo.text);

    const handleSave = () => {
        editTodo(todo.id, text);
        setIsEditing(false);
    };

    return (
        // <div className="todo-item">
        //     <input
        //         type="checkbox"
        //         checked={todo.completed}
        //         onChange={() => toggleTodo(todo.id)}
        //     />

        //     {isEditing ? (
        //         <input
        //             type="text"
        //             value={text}
        //             className="edit-input"
        //             onChange={(e) => setText(e.target.value)}
        //         />
        //     ) : (
        //         <span
        //             className={`todo-text ${todo.completed ? "completed" : ""}`}
        //         >
        //             {todo.text}
        //         </span>
        //     )}

        //     <div className="todo-actions">
        //         {isEditing ? (
        //             <button className="save-btn" onClick={handleSave}>
        //                 💾
        //             </button>
        //         ) : (
        //             <button className="edit-btn" onClick={() => setIsEditing(true)}>
        //                 ✏️
        //             </button>
        //         )}
        //         <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
        //             🗑
        //         </button>
        //     </div>
        // </div>

        <div className="todo-item">
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
            />

            {isEditing ? (
                <input
                    type="text"
                    value={text}
                    className="edit-input"
                    onChange={(e) => setText(e.target.value)}
                />
            ) : (
                <span
                    className={`todo-text ${todo.completed ? "completed" : ""}`}
                >
                    {todo.text}
                </span>
            )}

            <div className="todo-meta">
                {todo.dueDate && (
                    <span className="due-date">
                        <FaInfoCircle className="due-icon" />
                        {new Date(todo.dueDate).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "short",
                            year: "numeric"
                        })}
                    </span>
                )}

                <div className="todo-actions">
                    {isEditing ? (
                        <button className="save-btn" onClick={handleSave}>
                            💾
                        </button>
                    ) : (
                        <button className="edit-btn" onClick={() => setIsEditing(true)}>
                            ✏️
                        </button>
                    )}
                    <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                        🗑
                    </button>
                </div>
            </div>
        </div>
    );
};



TodoItem.propTypes = {
    todo: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    }).isRequired,
    toggleTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
};

export default TodoItem;
