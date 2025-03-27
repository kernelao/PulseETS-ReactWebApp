import React, { createContext, useContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode'

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

// fonction pour générer un faux JWT encodable avec rôle + expiration (dev uniquement)
const createFakeJWT = (role) => {
  const header = { alg: 'HS256', typ: 'JWT' }
  const payload = {
    role,
    exp: Math.floor(Date.now() / 1000) + 3600, // expire en 1h
  }

  const encode = (obj) => window.btoa(JSON.stringify(obj))
  return `${encode(header)}.${encode(payload)}.fake-signature`
}

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [token, setToken] = useState(null)

  // 🔄 Chargement automatique au démarrage
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken)
        const isExpired = decoded.exp * 1000 < Date.now()

        if (!isExpired) {
          setToken(storedToken)
          setIsAuthenticated(true)
          setIsAdmin(
            decoded.role === 'ROLE_ADMIN' ||
              decoded.role === 'admin' ||
              (Array.isArray(decoded.role) &&
                decoded.role.includes('ROLE_ADMIN'))
          )
        } else {
          localStorage.removeItem('token')
        }
      } catch (error) {
        console.error('Token invalide :', error)
        localStorage.removeItem('token')
      }
    }
  }, [])

  // 🔐 Connexion réelle
  const login = (newToken, role) => {
    localStorage.setItem('token', newToken)
    setToken(newToken)
    setIsAuthenticated(true)
    setIsAdmin(
      role === 'ROLE_ADMIN' ||
        role === 'admin' ||
        (Array.isArray(role) && role.includes('ROLE_ADMIN'))
    )
  }

  // 🚪 Déconnexion
  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setIsAuthenticated(false)
    setIsAdmin(false)
  }

  // 🧪 Simulation d'utilisateur (dev uniquement)
  const simulateUser = () => {
    if (process.env.NODE_ENV === 'development') {
      const fakeToken = createFakeJWT('ROLE_USER')
      localStorage.setItem('token', fakeToken)
      setToken(fakeToken)
      setIsAuthenticated(true)
      setIsAdmin(false)
    }
  }

  // 🧪 Simulation d'admin (dev uniquement)
  const simulateAdmin = () => {
    if (process.env.NODE_ENV === 'development') {
      const fakeToken = createFakeJWT('ROLE_ADMIN')
      localStorage.setItem('token', fakeToken)
      setToken(fakeToken)
      setIsAuthenticated(true)
      setIsAdmin(true)
    }
  }

  // 🔁 Réinitialisation simulation
  const resetSimulation = () => {
    if (process.env.NODE_ENV === 'development') {
      logout()
      alert('Simulation réinitialisée !')
    }
  }

  const value = {
    isAuthenticated,
    isAdmin,
    token,
    login,
    logout,
    simulateUser,
    simulateAdmin,
    resetSimulation,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
