import React, { useState } from 'react';
import './QuickPanneau.css';
import { Plus, MoreVertical, Check, ChevronUp } from 'lucide-react';

export default function QuickPanneau() {
  const [isOpen, setIsOpen] = useState(true);

  const [noteInput, setNoteInput] = useState("");
  const [notes, setNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [noteMenuId, setNoteMenuId] = useState(null);

  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [taskMenuId, setTaskMenuId] = useState(null);

  const handleAddNote = () => {
    if (!noteInput.trim()) return;
    setNotes([...notes, { id: Date.now(), text: noteInput }]);
    setNoteInput("");
  };

  const handleAddTask = () => {
    if (!taskInput.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: taskInput, done: false }]);
    setTaskInput("");
  };

  const handleNoteChange = (id, newText) => {
    setNotes(notes.map(n => n.id === id ? { ...n, text: newText } : n));
  };

  const handleTaskChange = (id, newText) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, text: newText } : t));
  };

  const toggleTaskDone = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, done: !t.done } : t));
  };

  const handleNoteDelete = (id) => {
    setNotes(notes.filter(n => n.id !== id));
    setNoteMenuId(null);
  };

  const handleTaskDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
    setTaskMenuId(null);
  };

  return (
    <div className="sliding-panel-wrapper">
      <div className="toggle-icon-wrapper" onClick={() => setIsOpen(!isOpen)}>
        <ChevronUp
          className={`chevron-toggle ${isOpen ? 'rotate-down' : ''}`}
          size={28}
        />
      </div>

      <div className={`sliding-panel ${isOpen ? 'open' : ''}`}>
        {/* 🔁 Tâches en premier */}
        <h3>Tâche rapide</h3>
        <div className="input-row">
          <input
            className="sliding-input"
            placeholder="Nouvelle tâche..."
            value={taskInput}
            onChange={(e) => setTaskInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddTask()}
          />
          <button className="add-btn" onClick={handleAddTask}><Plus size={18} /></button>
        </div>
        <ul className="item-list">
          {tasks.map(task => (
            <li key={task.id} className="item-row task-row">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTaskDone(task.id)}
                className="task-checkbox"
              />
              {editingTaskId === task.id ? (
                <input
                  value={task.text}
                  onChange={(e) => handleTaskChange(task.id, e.target.value)}
                  className="inline-edit-input task-input"
                  onKeyDown={(e) => e.key === 'Enter' && setEditingTaskId(null)}
               />
              ) : (
                <span className={`task-text ${task.done ? "task-done" : ""}`}>
                  {task.text}
                </span>
              )}
              <div className="task-menu square-menu-container">
                {editingTaskId === task.id ? (
                  <button className="menu-btn save-btn" onClick={() => setEditingTaskId(null)}>
                    <Check size={18} />
                  </button>
                ) : (
                  <>
                    <button
                      className="menu-btn"
                      onClick={() => setTaskMenuId(taskMenuId === task.id ? null : task.id)}
                    >
                      <MoreVertical size={18} />
                    </button>
                    {taskMenuId === task.id && (
                      <div className="dropdown-menu">
                        <button onClick={() => setEditingTaskId(task.id)}>Modifier</button>
                        <button onClick={() => handleTaskDelete(task.id)}>Supprimer</button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </li>
          ))}
        </ul>

        {/* ✏️ Ensuite les notes */}
        <h3 style={{ marginTop: '2rem' }}>Note rapide</h3>
        <div className="input-row">
          <input
            className="sliding-input"
            placeholder="Écris ici ta note..."
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAddNote()}
          />
          <button className="add-btn" onClick={handleAddNote}><Plus size={18} /></button>
        </div>
        <ul className="item-list">
          {notes.map(note => (
            <li key={note.id} className="item-row">
              {editingNoteId === note.id ? (
                <>
                  <input
                    value={note.text}
                    onChange={(e) => handleNoteChange(note.id, e.target.value)}
                    className="inline-edit-input"
                    onKeyDown={(e) => e.key === 'Enter' && setEditingNoteId(null)}
                  />
                  <div className="item-actions square-menu-container">
                    <button className="menu-btn save-btn" onClick={() => setEditingNoteId(null)}>
                      <Check size={18} />
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span className="note-text">{note.text}</span>
                  <div className="item-actions square-menu-container">
                    <button
                      className="menu-btn"
                      onClick={() => setNoteMenuId(noteMenuId === note.id ? null : note.id)}
                    >
                      <MoreVertical size={18} />
                    </button>
                    {noteMenuId === note.id && (
                      <div className="dropdown-menu">
                        <button onClick={() => setEditingNoteId(note.id)}>Modifier</button>
                        <button onClick={() => handleNoteDelete(note.id)}>Supprimer</button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}