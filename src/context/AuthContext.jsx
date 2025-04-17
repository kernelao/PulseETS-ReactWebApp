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
  const [isReady, setIsReady] = useState(false)

  // chargement automatique au démarrage
  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken)
        console.log('🔐 Token décodé :', decoded)
  
        const isExpired = decoded.exp * 1000 < Date.now()
  
        if (!isExpired) {
          setToken(storedToken)
          setIsAuthenticated(true)
  
          const roleIsAdmin = (() => {
            if (!decoded.role) return false
            if (typeof decoded.role === 'string') return decoded.role.includes("ADMIN")
            if (Array.isArray(decoded.role)) return decoded.role.some(r => r.includes("ADMIN"))
            return false
          })()
  
          console.log('🎩 Est admin ?', roleIsAdmin)
  
          setIsAdmin(roleIsAdmin)
        } else {
          localStorage.removeItem('token')
        }
      } catch (error) {
        console.error('Token invalide :', error)
        localStorage.removeItem('token')
      }
    }
    setIsReady(true)
  }, [])

  // connexion réelle
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

  // déconnexion
  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setIsAuthenticated(false)
    setIsAdmin(false)
  }

  // simulation d'utilisateur (dev uniquement)
  const simulateUser = () => {
    if (process.env.NODE_ENV === 'development') {
      const fakeToken = createFakeJWT('ROLE_USER')
      localStorage.setItem('token', fakeToken)
      setToken(fakeToken)
      setIsAuthenticated(true)
      setIsAdmin(false)
    }
  }

  // simulation d'admin (dev uniquement)
  const simulateAdmin = () => {
    if (process.env.NODE_ENV === 'development') {
      const fakeToken = createFakeJWT('ROLE_ADMIN')
      localStorage.setItem('token', fakeToken)
      setToken(fakeToken)
      setIsAuthenticated(true)
      setIsAdmin(true)
    }
  }

  // réinitialisation simulation
  const resetSimulation = () => {
    if (process.env.NODE_ENV === 'development') {
      logout()
      alert('Simulation réinitialisée !')
    }
  }

  const value = {
    isReady,
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
