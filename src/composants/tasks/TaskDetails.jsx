import React, { useState } from "react";

const TaskDetails = ({ task, onSave, onBack }) => {
    const [description, setDescription] = useState(task.description || "");

    return (
        <div className="task-details">
            <h3>{task.title}</h3>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)} 
                onBlur={() => onSave(task.id, description)}     
                placeholder="Ajoutez une description..."
            />
            <button onClick={onBack}>Retour</button>
        </div>
    );
};

export default TaskDetails;
