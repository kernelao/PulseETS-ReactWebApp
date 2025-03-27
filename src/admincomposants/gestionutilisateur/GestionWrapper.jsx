import React, { useEffect, useState } from 'react'
import axios from '../../api/Axios'
import { useAuth } from '../../context/AuthContext'
import ListeUtilisateurs from './ListeUtilisateurs'
import EditionUtilisateur from './EditionUtilisateur'
import './gestionwrapper.css'

const GestionWrapper = () => {
  const { token } = useAuth()
  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => {
    document.body.classList.add('admin-page-no-scroll')
    return () => document.body.classList.remove('admin-page-no-scroll')
  }, [])

  const fetchUsers = () => {
    axios.get('/admin/users').then((res) => setUsers(res.data))
  }

  const handleDelete = (id) => {
    if (!window.confirm('Supprimer cet utilisateur ?')) return
    axios.delete(`/admin/users/${id}`).then(() => fetchUsers())
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  return (
    <div className="gestion-wrapper">
      <h1 className="gestion-title">Gestion des utilisateurs</h1>

      <div className="gestion-content">
        <div className={`table-zone ${selectedUser ? 'avec-form' : ''}`}>
          <ListeUtilisateurs
            users={users}
            onEdit={setSelectedUser}
            onDelete={handleDelete}
            onCreate={() => setSelectedUser({})}
          />
        </div>

        {selectedUser && (
          <div className="edition-bottom-bar">
            <button
              className="close-button"
              onClick={() => setSelectedUser(null)}
            >
              X
            </button>
            <EditionUtilisateur
              user={selectedUser}
              token={token}
              onUpdate={() => {
                fetchUsers()
                setSelectedUser(null)
              }}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default GestionWrapper
