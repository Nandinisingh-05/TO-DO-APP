import React from "react";

function TodoItem({ task, toggleComplete, deletetask }) {
    return (
        <div>
            <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleComplete(task.id)}
            />
            <span>{task.text}</span>
            <button onClick={() => deletetask(task.id)}>x</button>
        </div>
    );
};
export default TodoItem;