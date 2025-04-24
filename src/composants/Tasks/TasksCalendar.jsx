import React, { useState, useEffect } from "react";
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
  selectAllVisibleTasks,
  togglePinnedTask,
  completeSelectedTasks,
  deleteSelectedTasks
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDayTasks, setSelectedDayTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newTag, setNewTag] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newPriority, setNewPriority] = useState("moyenne");
  const [showMonthTasks, setShowMonthTasks] = useState(false);

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

  useEffect(() => {
    if (!selectedDate) return;
    const key = new Date(selectedDate).toISOString().split("T")[0];
    const dayTasks = tasksByDate[key] || [];
    const sorted = [...dayTasks].sort((a, b) => (b.pinned === true) - (a.pinned === true));
    setSelectedDayTasks(sorted);
  }, [selectedDate, tasks]);

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

  const monthTasks = tasks.filter((task) => {
    const date = new Date(task.dueDate || task.createdAt);
    return (
      date.getMonth() === currentDate.getMonth() &&
      date.getFullYear() === currentDate.getFullYear()
    );
  });

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
        <button
          className="month-toggle-btn"
          onClick={() => setShowMonthTasks((prev) => !prev)}
          style={{ marginTop: "10px" }}
        >
          {showMonthTasks ? "Masquer les tâches du mois" : "Voir toutes les tâches du mois"}
        </button>
      </div>

      <div className="calendar-task-list">
        {showMonthTasks && (
          <>
            <h4>Toutes les tâches de {currentDate.toLocaleString("fr-FR", { month: "long", year: "numeric" })}</h4>

            {monthTasks.length > 0 ? (
              monthTasks.map(task => (
                <div key={task.id} className="calendar-task-line">
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
                    <button
                      style={{ backgroundColor: "#28a745" }}
                      onClick={() => handleComplete(task)}
                    >
                      ✓
                    </button>
                    <button onClick={() => togglePinnedTask(task)}>
                      {task.pinned ? "📍" : "📌"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Aucune tâche pour ce mois.</p>
            )}
          </>
        )}

        {!showMonthTasks && selectedDate && (
          <>
            <h4>Tâches du {formattedSelectedDate}</h4>
            {selectedDayTasks.length > 0 ? (
              selectedDayTasks.map(task => (
                <div key={task.id} className="calendar-task-line">
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
                    <button
                      style={{ backgroundColor: "#28a745" }}
                      onClick={() => handleComplete(task)}
                    >
                      ✓
                    </button>
                    <button onClick={() => togglePinnedTask(task)}>
                      {task.pinned ? "📍" : "📌"}
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>Aucune tâche pour ce jour.</p>
            )}
          </>
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
