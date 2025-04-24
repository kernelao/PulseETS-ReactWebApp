import React, { useState } from "react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

const TasksList = ({
    tasks,
    setSelectedTask,
    updateTask,
    deleteTask,
    updateTag,
    filter,
    showNotification,
    selectedIds,
    toggleTaskSelection,
    togglePinnedTask // ✅ Ajouté ici
}) => {
    const [editingTask, setEditingTask] = useState(null);
    const [newTitle, setNewTitle] = useState("");
    const [newTag, setNewTag] = useState("");
    const [newDate, setNewDate] = useState("");
    const [newPriority, setNewPriority] = useState("moyenne");

    const openEditModal = (task) => {
        setEditingTask(task);
        setNewTitle(task.title);
        setNewTag(task.tag || "");
        setNewDate(task.dueDate ? task.dueDate.slice(0, 10) : "");
        setNewPriority(task.priority || "moyenne");
    };

    const handleSaveEdit = () => {
        if (editingTask) {
            updateTask(editingTask.id, newTitle, newTag, newDate, null, newPriority);
            setEditingTask(null);
        }
    };

    const groupTasksByDay = (tasks) => {
        const grouped = {};
        tasks.forEach(task => {
            const date = new Date(task.dueDate || task.createdAt);
            date.setHours(0, 0, 0, 0);
            const key = format(date, "EEEE dd MMMM", { locale: fr });
            if (!grouped[key]) grouped[key] = [];
            grouped[key].push(task);
        });
        return grouped;
    };

    const groupedTasks = filter === "week" ? groupTasksByDay(tasks) : null;

    const sortTasks = (tasksArray) => {
        return [...tasksArray].sort((a, b) => {
            if (a.pinned && !b.pinned) return -1;
            if (!a.pinned && b.pinned) return 1;
            return 0;
        });
    };

    const renderTaskItem = (task) => (
        <div key={task.id} className="task-item" style={{ marginBottom: "8px" }}>
            <input
                type="checkbox"
                checked={selectedIds.includes(task.id)}
                onChange={() => toggleTaskSelection(task.id)}
                style={{ marginRight: "10px" }}
            />
            <div
                onClick={() => setSelectedTask(task)}
                style={{ flex: 1, textAlign: "left" }}
            >
                {task.title}
                {task.tag && (
                    <span className="tag-badge" onClick={(e) => {
                        e.stopPropagation();
                        updateTag(task.id, "");
                    }}>
                        #{task.tag} ✕
                    </span>
                )}
            </div>
            <div className="task-buttons" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {task.priority && (
                    <span
                        className={`priority-indicator ${
                            task.priority === "haute"
                                ? "priority-high"
                                : task.priority === "moyenne"
                                ? "priority-medium"
                                : "priority-low"
                        }`}
                        title={`Priorité ${task.priority}`}
                        style={{
                            width: "12px",
                            height: "12px",
                            borderRadius: "50%",
                            display: "inline-block"
                        }}
                    ></span>
                )}
                <button onClick={() => openEditModal(task)}>Modifier</button>
                <button onClick={() => deleteTask(task.id)}>Supprimer</button>
                <button
                    style={{ backgroundColor: "#28a745" }}
                    onClick={() =>
                        updateTask(task.id, task.title, task.tag, task.dueDate?.slice(0, 10), true, task.priority)
                    }
                >
                    ✓
                </button>
                <button onClick={() => togglePinnedTask(task)}>
                    {task.pinned ? "📍" : "📌"}
                </button>
            </div>
        </div>
    );

    return (
        <div className="tasks-list">
            {filter === "week" ? (
                Object.entries(groupedTasks).map(([day, tasks]) => (
                    <div key={day}>
                        <h3 style={{ marginTop: "15px", marginBottom: "5px", textAlign: "center" }}>{day}</h3>
                        {sortTasks(tasks).map(renderTaskItem)}
                    </div>
                ))
            ) : (
                sortTasks(tasks).map(renderTaskItem)
            )}

            {editingTask && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h3>Modifier la tâche</h3>
                        <input
                            type="text"
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                            placeholder="Titre"
                        />
                        <input
                            type="text"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            placeholder="Tag"
                        />
                        <input
                            type="date"
                            value={newDate}
                            onChange={(e) => setNewDate(e.target.value)}
                        />
                        <select value={newPriority} onChange={(e) => setNewPriority(e.target.value)}>
                            <option value="basse">Basse</option>
                            <option value="moyenne">Moyenne</option>
                            <option value="haute">Haute</option>
                        </select>
                        <div className="task-buttons">
                            <button onClick={handleSaveEdit}>Enregistrer</button>
                            <button onClick={() => setEditingTask(null)}>Annuler</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TasksList;
