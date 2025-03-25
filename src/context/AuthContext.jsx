import React, { createContext, useContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// fonction pour générer un faux JWT encodable avec role + expiration
const createFakeJWT = (role) => {
  const header = { alg: "HS256", typ: "JWT" };
  const payload = {
    role,
    exp: Math.floor(Date.now() / 1000) + 3600 // expire en 1h
  };

  const encode = (obj) => window.btoa(JSON.stringify(obj));
  return `${encode(header)}.${encode(payload)}.fake-signature`;
};

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [token, setToken] = useState(null);

  // initialisation automatique au chargement
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      try {
        const decoded = jwtDecode(storedToken);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (!isExpired) {
          setToken(storedToken);
          setIsAuthenticated(true);
          setIsAdmin(decoded.role === 'admin');
        } else {
          localStorage.removeItem('token');
        }
      } catch (error) {
        console.error("Token invalide :", error);
        localStorage.removeItem('token');
      }
    }
  }, []);

  // connexion réelle
  const login = (newToken, role) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setIsAuthenticated(true);
    setIsAdmin(role === 'admin');
  };

  // déconnexion
  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  // simulation utilisateur (dev only)
  const simulateUser = () => {
    if (process.env.NODE_ENV === 'development') {
      const fakeToken = createFakeJWT('user');
      localStorage.setItem('token', fakeToken);
      setToken(fakeToken);
      setIsAuthenticated(true);
      setIsAdmin(false);
    }
  };

  // simulation admin (dev only)
  const simulateAdmin = () => {
    if (process.env.NODE_ENV === 'development') {
      const fakeToken = createFakeJWT('admin');
      localStorage.setItem('token', fakeToken);
      setToken(fakeToken);
      setIsAuthenticated(true);
      setIsAdmin(true);
    }
  };

  // réinitialisation de la simulation (déconnexion soft)
  const resetSimulation = () => {
    if (process.env.NODE_ENV === 'development') {
      logout();
      alert("Simulation réinitialisée !");
    }
  };

  const value = {
    isAuthenticated,
    isAdmin,
    token,
    login,
    logout,
    simulateUser,
    simulateAdmin,
    resetSimulation,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
