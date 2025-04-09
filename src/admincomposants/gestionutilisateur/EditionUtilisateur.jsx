import React, { useState, useEffect } from 'react'
import axios from '../../api/Axios'
import './editionutilisateur.css'

const EditionUtilisateur = ({ user, token, onUpdate }) => {
  const isNew = user && user.id === undefined

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    roles: '',
    password: '',
  })

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username ?? '',
        email: user.email ?? '',
        roles: Array.isArray(user.roles) ? user.roles.join(', ') : '',
        password: '',
      })
    }
  }, [user])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (isNew && !formData.password.trim()) {
      alert('Le mot de passe est requis pour créer un utilisateur.')
      return
    }

    const payload = {
      username: formData.username,
      email: formData.email,
      roles: formData.roles.split(',').map((r) => r.trim()),
    }

    if (formData.password.trim()) {
      payload.password = formData.password
    }

    const url = isNew ? '/admin/users' : `/admin/users/${user.id}`
    const method = isNew ? 'post' : 'put'

    axios[method](url, payload)
      .then(() => {
        alert(`Utilisateur ${isNew ? 'créé' : 'modifié'} avec succès`)
        onUpdate()
      })
      .catch((error) => {
        console.error('Erreur Axios :', error)
        const msg =
          error?.response?.data?.message || "Erreur lors de l'opération"
        alert(msg)
      })
  }

  return (
    <form className="edition-form" onSubmit={handleSubmit}>
      <h2>{isNew ? 'Créer un utilisateur' : `Modifier ${user.username}`}</h2>

      <div className="form-grid">
        <div>
          <label>Nom d'utilisateur</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Rôles (séparés par virgule)</label>
          <input
            type="text"
            name="roles"
            value={formData.roles}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>
            Mot de passe{' '}
            {isNew ? '(obligatoire)' : '(laisser vide si inchangé)'}
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            {...(isNew ? { required: true } : {})}
          />
        </div>
      </div>

      <button type="submit">{isNew ? 'Créer' : 'Enregistrer'}</button>
    </form>
  )
}

export default EditionUtilisateur
