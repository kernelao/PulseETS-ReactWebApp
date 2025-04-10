import React, { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import "./TasksCalendar.css";

const TasksCalendar = ({
    tasks,
    setSelectedTask,
    updateTask,
    deleteTask,
    updateTag,
    showNotification,
    selectedIds,
    toggleTaskSelection,
    selectAllVisibleTasks
}) => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [editingTask, setEditingTask] = useState(null);
    const [newTitle, setNewTitle] = useState("");
    const [newTag, setNewTag] = useState("");
    const [newDate, setNewDate] = useState("");
    const [newPriority, setNewPriority] = useState("moyenne");

    const tasksByDate = tasks.reduce((acc, task) => {
        if (task.dueDate) {
            const key = new Date(task.dueDate).toISOString().split("T")[0];
            if (!acc[key]) acc[key] = [];
            acc[key].push(task);
        }
        return acc;
    }, {});

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const formattedSelectedDate = selectedDate
        ? new Date(selectedDate).toISOString().split("T")[0]
        : null;

    const selectedDayTasks = formattedSelectedDate
        ? tasksByDate[formattedSelectedDate] || []
        : [];

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
        updateTask(task.id, task.title, task.tag, task.dueDate?.slice(0, 10), true, task.priority);
        showNotification("✅ Tâche complétée !");
    };

    const handleCompleteSelected = () => {
        selectedDayTasks.forEach(task => {
            if (selectedIds.includes(task.id)) handleComplete(task);
        });
        showNotification("✅ Tâches complétées !");
        setTimeout(() => setSelectedTask(null), 100);
    };

    const handleDeleteSelected = () => {
        selectedDayTasks.forEach(task => {
            if (selectedIds.includes(task.id)) deleteTask(task.id);
        });
        showNotification("🗑️ Tâches supprimées !");
        setTimeout(() => setSelectedTask(null), 100);
    };

    const togglePin = (task) => {
        updateTask(task.id, task.title, task.tag, task.dueDate, task.completed, task.priority, !task.pinned);
    };

    return (
        <div className="calendar-wrapper">
            <div className="calendar-container">
                <Calendar
                    onChange={(date) => {
                        setCurrentDate(date);
                        handleDateClick(date);
                    }}
                    value={currentDate}
                    tileContent={({ date, view }) => {
                        if (view === "month") {
                            const key = date.toISOString().split("T")[0];
                            const dayTasks = tasksByDate[key] || [];
                            return (
                                <div className="calendar-day-tasks">
                                    {dayTasks.map((task) => (
                                        <div key={task.id} className="calendar-task">
                                            {task.title}
                                        </div>
                                    ))}
                                </div>
                            );
                        }
                        return null;
                    }}
                    locale="fr-FR"
                />
            </div>

            <div className="calendar-task-list">
                {selectedDate ? (
                    <>
                        <h4>Tâches du {formattedSelectedDate}</h4>
                        {selectedDayTasks.length > 0 ? (
                            selectedDayTasks.map(task => (
                                <div key={task.id} className="calendar-task-line">
  {/* Colonne gauche : case à cocher + infos */}
  <div className="calendar-task-info">
    <input
      type="checkbox"
      checked={selectedIds.includes(task.id)}
      onChange={() => toggleTaskSelection(task.id)}
    />
    <div className="task-title-tag" onClick={() => setSelectedTask(task)}>
      <strong>{task.title}</strong>
      {task.tag && (
        <span
          className="tag-badge"
          onClick={(e) => {
            e.stopPropagation();
            updateTag(task.id, "");
          }}
        >
          #{task.tag} ✕
        </span>
      )}
    </div>
  </div>

  {/* Colonne droite : pastille de priorité + boutons */}
  <div className="task-buttons">
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
      ></span>
    )}
    <button onClick={() => openEditModal(task)}>Modifier</button>
    <button onClick={() => deleteTask(task.id)}>Supprimer</button>
    <button style={{ backgroundColor: "#28a745" }} onClick={() => handleComplete(task)}>✓</button>
    <button onClick={() => togglePinnedTask(task)}
    >{task.pinned ? "📍" : "📌"}</button>
  </div>
</div>



                            ))
                        ) : (
                            <p>Aucune tâche pour ce jour.</p>
                        )}
                    </>
                ) : (
                    <p>Sélectionnez une date pour voir les tâches.</p>
                )}
            </div>

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

export default TasksCalendar;