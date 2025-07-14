import React from 'react'
import PropTypes from 'prop-types';

const TodoItem = ({ todo, onUpdate, onDelete }) => {
    return (
        <div className="todo">
            <input type="checkbox" checked={todo.completed} onChange={() => onUpdate(todo._id, { ...todo, completed: !todo.completed })} />
            <span className={todo.completed ? 'completed' : ''}>{todo.text}</span>
            <button onClick={() => onDelete(todo._id)}>❌</button>
        </div>
    );
};
TodoItem.propTypes = {
    todo: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
    }).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default TodoItem;
