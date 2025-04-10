// CompletedTasks.jsx

import React from "react";

const CompletedTasks = ({
    tasks,
    restoreTask,
    deleteTask,
    selectedIds,
    toggleTaskSelection,
}) => {
    const completedTasks = tasks.filter(task => task.completed);

    return (
        <div className="tasks-list">
            {completedTasks.length === 0 ? (
                <p style={{ textAlign: "center" }}>Aucune tâche complétée pour le moment.</p>
            ) : (
                completedTasks.map(task => (
                    <div key={task.id} className="task-item" style={{ opacity: 0.6 }}>
                        <input
                            type="checkbox"
                            checked={selectedIds.includes(task.id)}
                            onChange={() => toggleTaskSelection(task.id)}
                            style={{ marginRight: "10px" }}
                        />
                        <div style={{ flex: 1, textAlign: "left" }}>
                            {task.title}
                            {task.tag && (
                                <span className="tag-badge">
                                    #{task.tag}
                                </span>
                            )}
                        </div>
                        <div className="task-buttons">
                            <button onClick={() => restoreTask(task.id)}>Restaurer</button>
                            <button onClick={() => deleteTask(task.id)}>Supprimer</button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default CompletedTasks;