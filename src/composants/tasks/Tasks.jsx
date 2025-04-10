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
import { createTache, deleteTache } from '../../api/tachesApi'
import { fetchTaches } from '../../api/tachesApi'
import { updateTache, completeTache } from '../../api/tachesApi' // ajoute completeTache si ce n'est pas déjà fait
import { restoreTache } from '../../api/tachesApi'

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

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const fetchedTasks = await fetchTaches()
        console.log('Tâches récupérées:', fetchedTasks)
  
        const mappedTasks = fetchedTasks.map((t) => ({
          id: t.id,
          title: t.titre, // 🟢 CORRECTION ICI
          tag: t.tag,
          dueDate: t.dueDate,
          priority: t.priority,
          completed: t.completed,
          pinned: t.pinned,
          description: t.description || '',
          createdAt: t.createdAt
        }))
  
        setTasks(mappedTasks)
      } catch (error) {
        console.error("Erreur lors de la récupération des tâches", error)
      }
    }
    loadTasks()
  }, [])
  
  

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type })
    setTimeout(() => setNotification({ message: '', type: '' }), 3000)
  }

  const addTask = async (title, tag, dueDate, priority = 'moyenne') => {
    try {
      // Normalisation de la date (s'il n'y a pas de dueDate, on prend la date du jour)
      const dateToUse = dueDate ? new Date(dueDate) : new Date();
      // On met la date à minuit (en UTC pour éviter les décalages de fuseaux horaires)
      dateToUse.setUTCHours(0, 0, 0, 0);
  
      // Préparer les données de la tâche
      const tacheData = {
        titre: title,
        tag,
        dueDate: dateToUse.toISOString().split('T')[0], // yyyy-mm-dd
        priority,
        completed: false,
        pinned: false,
        description: '',
      };
  
      // Créer la tâche via l'API
      const newTaskFromApi = await createTache(tacheData);
  
      // Préparer la tâche pour l'affichage
      const newTask = {
        id: newTaskFromApi.id,
        title: newTaskFromApi.titre,
        tag: newTaskFromApi.tag,
        dueDate: newTaskFromApi.dueDate,
        priority: newTaskFromApi.priority,
        completed: newTaskFromApi.completed,
        pinned: newTaskFromApi.pinned,
        description: newTaskFromApi.description || '',
        createdAt: newTaskFromApi.createdAt,
      };
  
      // Mise à jour de l'état avec la nouvelle tâche
      setTasks((prev) => [...prev, newTask]);
  
      // Notification
      showNotification('✅ Nouvelle tâche ajoutée (API) !');
    } catch (error) {
      console.error('Erreur ajout tâche :', error);
      showNotification('❌ Erreur lors de l’ajout', 'error');
    }
  };
  
  

const updateTask = async (
  id,
  newTitle,
  newTag,
  newDate,
  completed = null,
  newPriority = null,
  pinned = null
) => {
  try {
    // Si on demande uniquement la complétion, utilise completeTache
    if (completed === true && newTitle === null && newTag === null && newDate === null) {
      const updatedFromApi = await completeTache(id)
      setTasks(tasks.map(t => t.id === id ? {
        ...t,
        completed: updatedFromApi.completed
      } : t))
      showNotification('✅ Tâche complétée !')
      return
    }

    const taskToUpdate = tasks.find(t => t.id === id)
    const data = {
      titre: newTitle ?? taskToUpdate.title,
      tag: newTag ?? taskToUpdate.tag,
      dueDate: newDate ?? taskToUpdate.dueDate,
      priority: newPriority ?? taskToUpdate.priority,
      completed: completed ?? taskToUpdate.completed,
      pinned: pinned ?? taskToUpdate.pinned,
      description: taskToUpdate.description
    }

    const updated = await updateTache(id, data)

    setTasks(tasks.map(t => t.id === id ? {
      ...t,
      title: updated.titre,
      tag: updated.tag,
      dueDate: updated.dueDate,
      priority: updated.priority,
      completed: updated.completed,
      pinned: updated.pinned,
      description: updated.description
    } : t))

    showNotification('✏️ Tâche modifiée !')
  } catch (err) {
    console.error('Erreur updateTask', err)
    showNotification('❌ Erreur lors de la modification', 'error')
  }
}

  

  const deleteTask = async (id) => {
    try {
      await deleteTache(id)
      setTasks(tasks.filter((task) => task.id !== id))
      if (selectedTask?.id === id) setSelectedTask(null)
      showNotification('🗑️ Tâche supprimée (API) !')
    } catch (error) {
      console.error('Erreur suppression tâche', error)
      showNotification('❌ Erreur lors de la suppression', 'error')
    }
  }

  const deleteSelectedTasks = async () => {
    try {
      await Promise.all(
        selectedIds.map(async (id) => {
          await deleteTache(id) // appel API
        })
      )
  
      setTasks(tasks.filter((task) => !selectedIds.includes(task.id)))
      setSelectedIds([])
      showNotification('🗑️ Tâches supprimées (API) !')
    } catch (err) {
      console.error('Erreur suppression multiple', err)
      showNotification('❌ Erreur lors de la suppression', 'error')
    }
  }
  

  const completeSelectedTasks = async () => {
    try {
      const updatedTasks = await Promise.all(
        selectedIds.map(async (id) => {
          const updated = await updateTache(id, { completed: true })
          return {
            ...tasks.find((task) => task.id === id),
            completed: updated.completed
          }
        })
      )
  
      setTasks((prev) =>
        prev.map((task) =>
          selectedIds.includes(task.id)
            ? updatedTasks.find((ut) => ut.id === task.id) || task
            : task
        )
      )
  
      setSelectedIds([])
      showNotification('✅ Tâches complétées (API) !')
    } catch (err) {
      console.error('Erreur lors de la complétion multiple', err)
      showNotification('❌ Erreur lors de la complétion', 'error')
    }
  }
  

  const restoreSelectedTasks = async () => {
    try {
      const updatedTasks = await Promise.all(
        selectedIds.map(async (id) => {
          const updated = await updateTache(id, { completed: false })
          return {
            ...tasks.find((task) => task.id === id),
            completed: updated.completed
          }
        })
      )
  
      setTasks((prev) =>
        prev.map((task) =>
          selectedIds.includes(task.id)
            ? updatedTasks.find((ut) => ut.id === task.id) || task
            : task
        )
      )
  
      setSelectedIds([])
      showNotification('🔁 Tâches restaurées (API) !')
    } catch (err) {
      console.error('Erreur restauration multiple', err)
      showNotification('❌ Erreur restauration', 'error')
    }
  }
  

  const removeTag = async (id) => {
    try {
      const taskToUpdate = tasks.find((t) => t.id === id);
      const updated = await updateTache(id, {
        titre: taskToUpdate.title,
        tag: '',
        dueDate: taskToUpdate.dueDate,
        priority: taskToUpdate.priority,
        completed: taskToUpdate.completed,
        pinned: taskToUpdate.pinned,
        description: taskToUpdate.description
      });
  
      setTasks(tasks.map((t) =>
        t.id === id ? { ...t, tag: updated.tag } : t
      ));
  
      showNotification('🏷️ Tag supprimé !');
    } catch (err) {
      console.error('Erreur suppression tag', err);
      showNotification('❌ Erreur suppression tag', 'error');
    }
  }
  

  const saveDescription = async (id, description) => {
    try {
      const taskToUpdate = tasks.find((t) => t.id === id);
      const updated = await updateTache(id, {
        titre: taskToUpdate.title,
        tag: taskToUpdate.tag,
        dueDate: taskToUpdate.dueDate,
        priority: taskToUpdate.priority,
        completed: taskToUpdate.completed,
        pinned: taskToUpdate.pinned,
        description: description
      });
  
      setTasks(tasks.map((t) =>
        t.id === id ? { ...t, description: updated.description } : t
      ));
  
      showNotification('💾 Description enregistrée !');
    } catch (err) {
      console.error('Erreur sauvegarde description', err);
      showNotification('❌ Erreur sauvegarde', 'error');
    }
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

  const restoreTask = async (id) => {
    try {
      const taskToRestore = tasks.find((task) => task.id === id)
      if (!taskToRestore) return
  
      const updated = await updateTache(id, {
        titre: taskToRestore.title,
        tag: taskToRestore.tag,
        dueDate: taskToRestore.dueDate?.slice(0, 10),
        priority: taskToRestore.priority,
        pinned: taskToRestore.pinned,
        completed: false,
        description: taskToRestore.description
      })
  
      setTasks(tasks.map((t) =>
        t.id === id
          ? {
              ...t,
              completed: updated.completed
            }
          : t
      ))
  
      showNotification('🔁 Tâche restaurée (API) !')
    } catch (error) {
      console.error('Erreur restauration tâche unique', error)
      showNotification('❌ Erreur restauration', 'error')
    }
  }
  
  const togglePinnedTask = async (task) => {
    try {
      const updated = await updateTache(task.id, {
        titre: task.title,
        tag: task.tag,
        dueDate: task.dueDate,
        priority: task.priority,
        completed: task.completed,
        pinned: !task.pinned,
        description: task.description,
      });
  
      setTasks(tasks.map((t) =>
        t.id === task.id ? {
          ...t,
          pinned: updated.pinned
        } : t
      ));
  
      showNotification(updated.pinned ? '📍 Tâche épinglée !' : '📌 Tâche désépinglée !');
    } catch (err) {
      console.error('Erreur épinglage tâche', err);
      showNotification('❌ Erreur lors de l’épinglage', 'error');
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
                togglePinnedTask={togglePinnedTask}
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
                togglePinnedTask={togglePinnedTask}
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
                togglePinnedTask={togglePinnedTask}
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
                togglePinnedTask={togglePinnedTask}
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