import React from 'react'
import PropTypes from 'prop-types';
import TodoItem from './TodoItem';
import './TodoList.css'

const TodoList = ({ todos, toggleTodo, deleteTodo, editTodo }) => {
    return (
        <div>
            {todos.length > 0 ? (
                todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        toggleTodo={toggleTodo}
                        deleteTodo={deleteTodo}
                        editTodo={editTodo}
                    />
                ))
            ) : (
                <p className="no-todos">No todos found</p>
            )}
        </div>
    );
}

TodoList.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object).isRequired,
    toggleTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
};

export default TodoList;
