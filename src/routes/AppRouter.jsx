import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicRoutes from './PublicRoutes'
import PrivateRoutes from './PrivateRoutes'
import AdminRoutes from './AdminRoutes'
import { ThemeContext } from '../context/ThemeContext';

const AppRouter = () => {

  const { theme } = useContext(ThemeContext);  // Récupère le thème depuis le contexte

  const themeClass = theme.toLowerCase().replace(" ", "-"); 

  return (
    <BrowserRouter>

      <Routes>
      
        {/* Routes publiques */}
        <Route path="/*" element={<PublicRoutes />} />
        
        {/* Routes privées pour les utilisateurs connectés */}
        
        <Route
        path="/app/*"
        element={
          <div className={themeClass}>
        <PrivateRoutes />
        </div>
        }
        />

        {/* Routes administrateur */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
