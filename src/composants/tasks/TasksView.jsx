import React, { useState } from 'react'
import { format, startOfWeek, addDays, isSameDay } from 'date-fns'
import fr from 'date-fns/locale/fr'

const daysOfWeek = [
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
  'Dimanche',
]

const TasksWeekView = ({
  tasks,
  setSelectedTask,
  updateTask,
  deleteTask,
  updateTag,
}) => {
  const [editingTask, setEditingTask] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newTag, setNewTag] = useState('')
  const [newDate, setNewDate] = useState('')

  const openEditModal = (task) => {
    setEditingTask(task)
    setNewTitle(task.title)
    setNewTag(task.tag || '')
    setNewDate(task.dueDate ? task.dueDate.slice(0, 10) : '')
  }

  const handleSaveEdit = () => {
    if (editingTask) {
      updateTask(
        editingTask.id,
        newTitle,
        newTag,
        newDate,
        editingTask.completed
      )
      setEditingTask(null)
    }
  }

  const today = new Date()
  const weekStart = startOfWeek(today, { weekStartsOn: 1 })

  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  const groupedTasks = days
    .map((day) => {
      const dayTasks = tasks.filter((task) => {
        if (!task.dueDate) return false
        return isSameDay(new Date(task.dueDate), day)
      })

      return {
        date: day,
        label: `${daysOfWeek[day.getDay()]} ${format(day, 'd MMMM', {
          locale: fr,
        })}`,
        tasks: dayTasks,
      }
    })
    .filter((day) => day.tasks.length > 0)

  return (
    <div className="tasks-list">
      {groupedTasks.map((day, index) => (
        <div key={index}>
          <h4
            style={{
              marginBottom: '8px',
              marginTop: '20px',
              textAlign: 'center',
            }}
          >
            {day.label}
          </h4>
          {day.tasks.map((task) => (
            <div
              key={task.id}
              className="task-item"
              style={{ opacity: task.completed ? 0.5 : 1 }}
            >
              <input
                type="checkbox"
                checked={task.completed || false}
                onChange={(e) =>
                  updateTask(
                    task.id,
                    task.title,
                    task.tag,
                    task.dueDate?.slice(0, 10),
                    e.target.checked
                  )
                }
                onClick={(e) => e.stopPropagation()} // ✅ pour éviter d'ouvrir le détail
                style={{ marginRight: '10px' }}
              />
              <div
                onClick={() => setSelectedTask(task)}
                style={{
                  flex: 1,
                  opacity: task.completed ? 0.5 : 1,
                }}
              >
                {task.title}
                {task.tag && (
                  <span
                    className="tag-badge"
                    onClick={(e) => {
                      e.stopPropagation()
                      updateTag(task.id, '')
                    }}
                  >
                    #{task.tag} ✕
                  </span>
                )}
              </div>
              <div className="task-buttons">
                <button onClick={() => openEditModal(task)}>Modifier</button>
                <button onClick={() => deleteTask(task.id)}>Supprimer</button>
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
            <div className="task-buttons">
              <button onClick={handleSaveEdit}>Enregistrer</button>
              <button onClick={() => setEditingTask(null)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TasksWeekView
