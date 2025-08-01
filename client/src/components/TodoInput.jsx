import React, { useState } from 'react'
import PropTypes from 'prop-types';

const TodoInput = ({ addTodo }) => {
    const [text, setText] = useState('');

    const handleAdd = () => {
        if (text.trim()) {
            addTodo(text);
            setText('');
        }
    };
    return (
        <div className='inputBox'>
            <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter new task..."
                className='input'
            />
            <button onClick={handleAdd} className='button'>Add</button>
        </div>
    );
};
TodoInput.propTypes = {
    addTodo: PropTypes.func.isRequired,
};

export default TodoInput;
