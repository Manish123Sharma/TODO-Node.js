import React, { useState } from 'react'

const TodoItem = ({ todo, onToggle, onDelete, onEdit }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(todo.text);

    const handleEdit = () => {
        if (isEditing) onEdit(todo.id, text);
        setIsEditing(!isEditing);
    };
    return (
        <div className='container'>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />
            {isEditing ? (
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className='editInput'
                />
            ) : (
                <span
                className='text'
                    style={{
                        textDecoration: todo.completed ? 'line-through' : 'none',
                    }}
                >
                    {todo.text}
                </span>
            )}
            <button onClick={handleEdit} className='edit'>
                {isEditing ? 'Save' : 'Edit'}
            </button>
            <button onClick={() => onDelete(todo.id)} className='delete'>
                Delete
            </button>
        </div>
    );
};



export default TodoItem;
