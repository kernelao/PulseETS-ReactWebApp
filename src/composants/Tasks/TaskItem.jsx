import React from "react";

const TaskItem = ({ task }) => {
    return (
        <div className="task-item">
            <span>{task.name}</span>
            <div className="task-buttons">
                <button className="edit-button">Modifier</button>
                <button className="delete-button">Supprimer</button>
            </div>
        </div>
    );
};

export default TaskItem;
