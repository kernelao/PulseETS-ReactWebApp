import axios from 'axios'

const API_URL = 'http://127.0.0.1:8000/api/taches'

const getAuthHeader = () => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
}

// 🔹 Récupérer toutes les tâches
export const fetchTaches = async () => {
  try {
    const res = await axios.get(API_URL, getAuthHeader())
    return res.data
  } catch (err) {
    console.error('Erreur fetchTaches:', err.response)
    throw err
  }
}

// 🔹 Créer une tâche
export const createTache = async (tacheData) => {
  try {
    const res = await axios.post(API_URL, tacheData, getAuthHeader())
    return res.data
  } catch (err) {
    console.error('Erreur createTache:', err.response)
    throw err
  }
}

// 🔹 Modifier une tâche
export const updateTache = async (id, updatedData) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, updatedData, getAuthHeader())
    return res.data
  } catch (err) {
    console.error('Erreur updateTache:', err.response)
    throw err
  }
}

// 🔹 Supprimer une tâche
export const deleteTache = async (id) => {
  try {
    const res = await axios.delete(`${API_URL}/${id}`, getAuthHeader())
    return res.data
  } catch (err) {
    console.error('Erreur deleteTache:', err.response)
    throw err
  }
}

// 🔹 Obtenir une tâche par ID
export const getTacheById = async (id) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`, getAuthHeader())
    return res.data
  } catch (err) {
    console.error('Erreur getTacheById:', err.response)
    throw err
  }
}


// 🔹 Marquer une tâche comme complétée
export const completeTache = async (id) => {
    try {
      const res = await axios.put(
        `${API_URL}/${id}`,
        { completed: true },
        getAuthHeader()
      )
      return res.data
    } catch (err) {
      console.error('Erreur completeTache:', err.response)
      throw err
    }
  }
  
  // 🔹 Restaurer une tâche (la remettre en "non complétée")
export const restoreTache = async (id) => {
    try {
      const res = await axios.put(
        `${API_URL}/${id}`,
        { completed: false },
        getAuthHeader()
      )
      return res.data
    } catch (err) {
      console.error('Erreur restoreTache:', err.response)
      throw err
    }
  }
  
  // 🔹 Supprimer le tag d’une tâche
export const removeTagFromTache = async (id) => {
    try {
      const res = await axios.put(
        `${API_URL}/${id}`,
        { tag: null },
        getAuthHeader()
      )
      return res.data
    } catch (err) {
      console.error('Erreur removeTagFromTache:', err.response)
      throw err
    }
  }
  