import React, { useState } from "react";
import { format, startOfWeek, addDays, isSameDay } from "date-fns";
import fr from "date-fns/locale/fr";

const daysOfWeek = ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"];

const TasksWeekView = ({
    tasks,
    setSelectedTask,
    updateTask,
    deleteTask,
    updateTag,
    showNotification,
    selectedIds,
    toggleTaskSelection
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

    const handleComplete = (task) => {
        updateTask(task.id, task.title, task.tag, task.dueDate?.slice(0, 10), true, task.priority, task.pinned);
        showNotification("✅ Tâche complétée !");
    };

    const togglePin = (task) => {
        updateTask(task.id, task.title, task.tag, task.dueDate?.slice(0, 10), task.completed, task.priority, !task.pinned);
    };

    const today = new Date();
    const weekStart = startOfWeek(today, { weekStartsOn: 1 });
    const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

    const groupedTasks = days.map(day => {
        const dayTasks = tasks.filter(task => {
            if (!task.dueDate) return false;
            return isSameDay(new Date(task.dueDate), day);
        });

        // Tri : épinglées en haut
        const sortedTasks = [...dayTasks].sort((a, b) => (b.pinned === true) - (a.pinned === true));

        return {
            date: day,
            label: `${daysOfWeek[day.getDay()]} ${format(day, "d MMMM", { locale: fr })}`,
            tasks: sortedTasks,
        };
    }).filter(day => day.tasks.length > 0);

    return (
        <div className="tasks-list">
            {groupedTasks.map((day, index) => (
                <div key={index} style={{ marginBottom: "20px" }}>
                    <h4 style={{ marginBottom: "8px", marginTop: "20px", textAlign: "center" }}>{day.label}</h4>
                    {day.tasks.map(task => (
                        <div key={task.id} className="task-item" style={{ marginBottom: "8px" }}>
                            <input
                                type="checkbox"
                                checked={selectedIds.includes(task.id)}
                                onChange={() => toggleTaskSelection(task.id)}
                                onClick={(e) => e.stopPropagation()}
                                style={{ marginRight: "10px" }}
                            />
                            <div onClick={() => setSelectedTask(task)} style={{ flex: 1, textAlign: "left" }}>
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

                            <div className="task-buttons">
                                {/* Badge de priorité */}
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
                                        style={{ alignSelf: "center" }}
                                    ></span>
                                )}

                                <button onClick={() => openEditModal(task)}>Modifier</button>
                                <button onClick={() => deleteTask(task.id)}>Supprimer</button>
                                <button style={{ backgroundColor: "#28a745" }} onClick={() => handleComplete(task)}>✓</button>
                                <button onClick={() => togglePin(task)}>
                                    {task.pinned ? "📍" : "📌"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ))}

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

export default TasksWeekView;
