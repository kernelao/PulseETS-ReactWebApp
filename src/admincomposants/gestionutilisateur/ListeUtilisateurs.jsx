import React, { useState, useMemo } from 'react'
import './listeutilisateurs.css'

const ListeUtilisateurs = ({ users, onEdit, onDelete, onCreate }) => {
  const [search, setSearch] = useState('')
  const [filtreRole, setFiltreRole] = useState('')
  const [ordreCroissant, setOrdreCroissant] = useState(true)

  const utilisateursFiltres = useMemo(() => {
    let resultat = [...users]

    if (search.trim()) {
      resultat = resultat.filter(
        (u) =>
          u.username?.toLowerCase().includes(search.toLowerCase()) ||
          u.email?.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (filtreRole) {
      resultat = resultat.filter((u) => u.roles?.includes(filtreRole))
    }

    resultat.sort((a, b) => (ordreCroissant ? a.id - b.id : b.id - a.id))

    return resultat
  }, [users, search, filtreRole, ordreCroissant])

  return (
    <div className="liste-utilisateurs">
      <div className="liste-filtres">
        <select
          onChange={(e) => setFiltreRole(e.target.value)}
          value={filtreRole}
        >
          <option value="">Tous les rôles</option>
          <option value="ROLE_USER">ROLE_USER</option>
          <option value="ROLE_ADMIN">ROLE_ADMIN</option>
        </select>

        <input
          type="text"
          placeholder="Recherche par username ou email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <button onClick={() => setOrdreCroissant(!ordreCroissant)}>
          Trier par ID ({ordreCroissant ? '↑' : '↓'})
        </button>

        <button onClick={onCreate}>+ Ajouter un utilisateur</button>
      </div>

      <div className="table-scroll">
        <table className="liste-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Rôles</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {utilisateursFiltres.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{(user.roles || []).join(', ')}</td>
                <td>
                  <button onClick={() => onEdit(user)}>Modifier</button>
                  <button onClick={() => onDelete(user.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ListeUtilisateurs
