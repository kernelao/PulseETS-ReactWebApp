import React, { useState } from 'react'

const TasksForm = ({ addTask }) => {
  const [title, setTitle] = useState('')
  const [tag, setTag] = useState('')
  const [date, setDate] = useState('')
  const [priority, setPriority] = useState('moyenne')

  const handleAddTask = () => {
    if (title.trim()) {
      // ✅ Format de date attendu par l'API Symfony : 'YYYY-MM-DD'
      const formattedDate = date || new Date().toISOString().split('T')[0]

      addTask(title, tag, formattedDate, priority)

      // 🔁 Réinitialisation des champs après ajout
      setTitle('')
      setTag('')
      setDate('')
      setPriority('moyenne')
    }
  }

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
  )
}

export default TasksForm
