import React, { useEffect, useState } from 'react'
import TasksFilter from './TasksFilter'
import TasksList from './TasksList'
import TaskDetails from './TaskDetails'
import TasksForm from './TasksForm'
import TasksCalendar from './TasksCalendar'
import TasksWeekView from './TasksWeekView'
import CompletedTasks from './CompletedTasks'
import Notification from './Notification'
import './Tasks.css'

const Tasks = () => {
  const [tasks, setTasks] = useState([])
  const [selectedTask, setSelectedTask] = useState(null)
  const [filter, setFilter] = useState('day')
  const [tagSearch, setTagSearch] = useState('')
  const [notification, setNotification] = useState({ message: '', type: '' })
  const [selectedIds, setSelectedIds] = useState([])

  // 🔒 Bloquer le scroll global uniquement sur cette page
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
      document.documentElement.style.overflow = 'auto'
    }
  }, [])

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: '', type: '' }), 3000)
  }

  const addTask = (title, tag, dueDate, priority = 'moyenne') => {
    const dateToUse = dueDate ? new Date(dueDate) : new Date()
    dateToUse.setHours(0, 0, 0, 0)
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        title,
        tag,
        dueDate: dateToUse.toISOString(),
        description: '',
        createdAt: new Date().toISOString(),
        completed: false,
        priority,
        pinned: false,
      },
    ])
    showNotification('✅ Nouvelle tâche ajoutée !')
  }

  const updateTask = (
    id,
    newTitle,
    newTag,
    newDate,
    completed = null,
    newPriority = null,
    pinned = null
  ) => {
    setTasks(
      tasks.map((task) => {
        if (task.id === id) {
          const updatedTask = {
            ...task,
            title: newTitle,
            tag: newTag,
            dueDate: newDate
              ? new Date(newDate + 'T00:00:00').toISOString()
              : task.dueDate,
          }
          if (completed !== null) updatedTask.completed = completed
          if (newPriority !== null) updatedTask.priority = newPriority
          if (pinned !== null) updatedTask.pinned = pinned
          return updatedTask
        }
        return task
      })
    )
    if (completed === true) {
      showNotification('✅ Tâche complétée !')
    } else if (completed === null) {
      showNotification('✏️ Tâche modifiée !')
    }
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id))
    if (selectedTask?.id === id) setSelectedTask(null)
    showNotification('🗑️ Tâche supprimée !')
  }

  const deleteSelectedTasks = () => {
    setTasks(tasks.filter((task) => !selectedIds.includes(task.id)))
    setSelectedIds([])
    showNotification('🗑️ Tâches supprimées !')
  }

  const completeSelectedTasks = () => {
    const updated = tasks.map((task) => {
      if (selectedIds.includes(task.id)) {
        return { ...task, completed: true }
      }
      return task
    })
    setTasks(updated)
    setSelectedIds([])
    showNotification('✅ Tâches complétées !')
  }

  const restoreSelectedTasks = () => {
    const updated = tasks.map((task) => {
      if (selectedIds.includes(task.id) && task.completed) {
        return { ...task, completed: false }
      }
      return task
    })
    setTasks(updated)
    setSelectedIds([])
    showNotification('🔁 Tâches restaurées !')
  }

  const removeTag = (id) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, tag: '' } : task))
    )
  }

  const saveDescription = (id, description) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, description } : task))
    )
  }

  const getFilterTitle = () => {
    switch (filter) {
      case 'day':
        return 'Tâches du jour'
      case 'week':
        return 'Tâches de la semaine'
      case 'month':
        return 'Tâches du mois'
      case 'completed':
        return 'Tâches complétées'
      default:
        return ''
    }
  }

  const filteredTasks = tasks.filter((task) => {
    const now = new Date()
    now.setHours(0, 0, 0, 0)

    const taskDate = new Date(task.dueDate || task.createdAt)
    taskDate.setHours(0, 0, 0, 0)

    const matchTag =
      tagSearch.trim() === '' ||
      task.tag?.toLowerCase().includes(tagSearch.toLowerCase())

    if (filter === 'month') return matchTag && !task.completed
    if (filter === 'completed') return task.completed && matchTag

    const matchDate =
      (filter === 'day' && taskDate.getTime() === now.getTime()) ||
      (filter === 'week' &&
        (() => {
          const start = new Date(now)
          start.setDate(
            now.getDate() - (now.getDay() === 0 ? 6 : now.getDay() - 1)
          )
          start.setHours(0, 0, 0, 0)
          const end = new Date(start)
          end.setDate(start.getDate() + 6)
          end.setHours(23, 59, 59, 999)
          return taskDate >= start && taskDate <= end
        })())

    return matchDate && !task.completed && matchTag
  })

  const restoreTask = (id) => {
    const taskToRestore = tasks.find((task) => task.id === id)
    if (taskToRestore) {
      updateTask(
        taskToRestore.id,
        taskToRestore.title,
        taskToRestore.tag,
        taskToRestore.dueDate?.slice(0, 10),
        false
      )
      showNotification('🔁 Tâche restaurée !')
    }
  }

  const toggleTaskSelection = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const selectAllVisibleTasks = (tasksToSelect) => {
    const ids = tasksToSelect.map((task) => task.id)
    setSelectedIds(ids)
  }

  return (
    <div className="tasks-page">
      <div className="tasks-container">
        <div className="left-panel" style={{ position: 'relative' }}>
          <h2 className="tasks-title">Vue Des Jours</h2>
          <TasksFilter setFilter={setFilter} />
          <div className="tag-search">
            <h3>Filtrer par tag</h3>
            <input
              type="text"
              placeholder="Rechercher un tag..."
              value={tagSearch}
              onChange={(e) => setTagSearch(e.target.value)}
            />
          </div>
          {notification.message && (
            <Notification
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification({ message: '', type: '' })}
            />
          )}
        </div>

        <div className="right-panel">
          <div className="right-content">
            <div className="task-header">
              <h3 className="task-view-title">{getFilterTitle()}</h3>
              {filter !== 'completed' ? (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    className="delete-visible-btn"
                    onClick={() => selectAllVisibleTasks(filteredTasks)}
                  >
                    Sélectionner
                  </button>
                  <button
                    className="delete-visible-btn"
                    onClick={deleteSelectedTasks}
                    disabled={selectedIds.length === 0}
                  >
                    🗑️
                  </button>
                  <button
                    className="delete-visible-btn"
                    onClick={completeSelectedTasks}
                    disabled={selectedIds.length === 0}
                  >
                    ✅
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    className="delete-visible-btn"
                    onClick={() =>
                      selectAllVisibleTasks(
                        tasks.filter((task) => task.completed)
                      )
                    }
                  >
                    Sélectionner
                  </button>
                  <button
                    className="delete-visible-btn"
                    onClick={restoreSelectedTasks}
                    disabled={selectedIds.length === 0}
                  >
                    🔁
                  </button>
                  <button
                    className="delete-visible-btn"
                    onClick={deleteSelectedTasks}
                    disabled={selectedIds.length === 0}
                  >
                    🗑️
                  </button>
                </div>
              )}
            </div>

            {selectedTask ? (
              <TaskDetails
                task={selectedTask}
                onSave={saveDescription}
                onBack={() => setSelectedTask(null)}
              />
            ) : filter === 'month' ? (
              <TasksCalendar
                tasks={filteredTasks}
                setSelectedTask={setSelectedTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
                updateTag={removeTag}
                showNotification={showNotification}
                selectedIds={selectedIds}
                toggleTaskSelection={toggleTaskSelection}
                selectAllVisibleTasks={selectAllVisibleTasks}
              />
            ) : filter === 'week' ? (
              <TasksWeekView
                tasks={filteredTasks}
                setSelectedTask={setSelectedTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
                updateTag={removeTag}
                showNotification={showNotification}
                selectedIds={selectedIds}
                toggleTaskSelection={toggleTaskSelection}
              />
            ) : filter === 'completed' ? (
              <CompletedTasks
                tasks={tasks}
                restoreTask={restoreTask}
                deleteTask={deleteTask}
                restoreSelectedTasks={restoreSelectedTasks}
                deleteSelectedTasks={deleteSelectedTasks}
                selectedIds={selectedIds}
                toggleTaskSelection={toggleTaskSelection}
                selectAllVisibleTasks={selectAllVisibleTasks}
              />
            ) : (
              <TasksList
                tasks={filteredTasks}
                setSelectedTask={setSelectedTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
                updateTag={removeTag}
                filter={filter}
                showNotification={showNotification}
                selectedIds={selectedIds}
                toggleTaskSelection={toggleTaskSelection}
              />
            )}
          </div>
          <TasksForm addTask={addTask} />
        </div>
      </div>
    </div>
  )
}

export default Tasks
