import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PublicRoutes from './PublicRoutes'
import PrivateRoutes from './PrivateRoutes'
import AdminRoutes from './AdminRoutes'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes publiques */}
        <Route path="/*" element={<PublicRoutes />} />

        {/* Routes privées pour les utilisateurs connectés */}
        <Route path="/app/*" element={<PrivateRoutes />} />

        {/* Routes administrateur */}
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
