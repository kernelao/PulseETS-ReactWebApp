import React, { useEffect, useState } from 'react'
import axios from './../../api/Axios'
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

  useEffect(() => {
    axios
      .get('/taches')
      .then((res) => setTasks(res.data))
      .catch(() =>
        showNotification('Erreur lors du chargement des tâches', 'error')
      )
  }, [])

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: '', type: '' }), 3000)
  }

  const addTask = (title, tag, dueDate, priority = 'moyenne') => {
    console.log(' addTask reçu :', { title, tag, dueDate, priority })

    const data = {
      titre: title,
      tag: tag || null,
      priority,
      dueDate: dueDate.toISOString().split('T')[0],
      completed: false,
      pinned: false,
    }

    axios
      .post('/taches', data)
      .then((res) => {
        console.log(' Tâche ajoutée :', res.data) //  LOG
        setTasks((prev) => [...prev, res.data])
        showNotification(' Nouvelle tâche ajoutée !')
      })
      .catch((err) => {
        console.error(' Erreur lors de l’ajout :', err.response || err)
        showNotification(' Erreur lors de l’ajout', 'error')
      })
  }

  const updateTask = (
    id,
    title,
    tag,
    dueDate,
    completed = null,
    priority = null,
    pinned = null
  ) => {
    const data = {
      ...(title !== undefined && { titre: title }),
      ...(tag !== undefined && { tag }),
      ...(dueDate && { dueDate: dueDate }),
      ...(completed !== null && { completed }),
      ...(priority && { priority }),
      ...(pinned !== null && { pinned }),
    }

    axios
      .put(`/taches/${id}`, data)
      .then((res) => {
        setTasks((prev) =>
          prev.map((task) => (task.id === id ? res.data : task))
        )
        if (completed) showNotification('✅ Tâche complétée !')
        else showNotification('✏️ Tâche modifiée !')
      })
      .catch(() =>
        showNotification('❌ Erreur lors de la modification', 'error')
      )
  }

  const deleteTask = (id) => {
    axios
      .delete(`/taches/${id}`)
      .then(() => {
        setTasks((prev) => prev.filter((task) => task.id !== id))
        setSelectedTask(null)
        showNotification('🗑️ Tâche supprimée !')
      })
      .catch(() =>
        showNotification('❌ Erreur lors de la suppression', 'error')
      )
  }

  const deleteSelectedTasks = () => {
    Promise.all(selectedIds.map((id) => axios.delete(`/taches/${id}`))).then(
      () => {
        setTasks((prev) =>
          prev.filter((task) => !selectedIds.includes(task.id))
        )
        setSelectedIds([])
        showNotification('🗑️ Tâches supprimées !')
      }
    )
  }

  const completeSelectedTasks = () => {
    Promise.all(
      selectedIds.map((id) => axios.put(`/taches/${id}`, { completed: true }))
    ).then(() => {
      setTasks((prev) =>
        prev.map((task) =>
          selectedIds.includes(task.id) ? { ...task, completed: true } : task
        )
      )
      setSelectedIds([])
      showNotification('✅ Tâches complétées !')
    })
  }

  const restoreSelectedTasks = () => {
    Promise.all(
      selectedIds.map((id) => axios.put(`/taches/${id}`, { completed: false }))
    ).then(() => {
      setTasks((prev) =>
        prev.map((task) =>
          selectedIds.includes(task.id) ? { ...task, completed: false } : task
        )
      )
      setSelectedIds([])
      showNotification('🔁 Tâches restaurées !')
    })
  }

  const restoreTask = (id) => {
    updateTask(id, undefined, undefined, undefined, false)
    showNotification('🔁 Tâche restaurée !')
  }

  const removeTag = (id) => {
    axios.put(`/taches/${id}`, { tag: '' }).then((res) => {
      setTasks((prev) => prev.map((task) => (task.id === id ? res.data : task)))
    })
  }

  const saveDescription = (id, description) => {
    axios.put(`/taches/${id}`, { description }).then((res) => {
      setTasks((prev) => prev.map((task) => (task.id === id ? res.data : task)))
    })
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
          const end = new Date(start)
          end.setDate(start.getDate() + 6)
          return taskDate >= start && taskDate <= end
        })())

    return matchDate && !task.completed && matchTag
  })

  return (
    <div className="tasks-page">
      <div className="tasks-container">
        <div className="left-panel">
          <h2 className="tasks-title">Vue des tâches</h2>
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
                  <button onClick={() => selectAllVisibleTasks(filteredTasks)}>
                    Sélectionner
                  </button>
                  <button
                    onClick={deleteSelectedTasks}
                    disabled={selectedIds.length === 0}
                  >
                    🗑️
                  </button>
                  <button
                    onClick={completeSelectedTasks}
                    disabled={selectedIds.length === 0}
                  >
                    ✅
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button
                    onClick={() =>
                      selectAllVisibleTasks(tasks.filter((t) => t.completed))
                    }
                  >
                    Sélectionner
                  </button>
                  <button
                    onClick={restoreSelectedTasks}
                    disabled={selectedIds.length === 0}
                  >
                    🔁
                  </button>
                  <button
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
