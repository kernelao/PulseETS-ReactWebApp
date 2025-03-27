import React, { useState } from "react";

const TasksForm = ({ addTask }) => {
    const [title, setTitle] = useState("");
    const [tag, setTag] = useState("");
    const [date, setDate] = useState("");
    const [priority, setPriority] = useState("moyenne");

    const handleAddTask = () => {
        const normalizedDate = date ? new Date(date + "T00:00:00") : new Date();
        normalizedDate.setHours(0, 0, 0, 0);

        if (title.trim()) {
            addTask(title, tag, normalizedDate, priority);
            setTitle("");
            setTag("");
            setDate("");
            setPriority("moyenne");
        }
    };

    return (
        <div className="tasks-form">
            <input
                type="text"
                placeholder="Nom de la tâche"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Tag associé"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
            />
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
            />
            <select value={priority} onChange={(e) => setPriority(e.target.value)}>
                <option value="basse">Basse</option>
                <option value="moyenne">Moyenne</option>
                <option value="haute">Haute</option>
            </select>
            <button onClick={handleAddTask}>+ Ajouter</button>
        </div>
    );
};

export default TasksForm;
