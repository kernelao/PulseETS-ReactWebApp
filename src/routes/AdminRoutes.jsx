import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import SidebarLayout from '../composants/sidebar/SidebarLayout'
import { AdminSidebarData } from '../composants/sidebar/AdminSidebarData'

// Pages admin
import AdminDashboard from '../pages/admin/AdminDashboard'
import GestionUtilisateur from '../pages/admin/GestionUtilisateur'
import GestionBoutique from '../pages/admin/GestionBoutique'
import GestionReglages from '../pages/admin/GestionReglages'

const AdminRoutes = () => {
  const { isAuthenticated, isAdmin } = useAuth()

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/connexion" replace />
  }

  return (
    <Routes>
      <Route element={<SidebarLayout data={AdminSidebarData} />}>
        <Route path="adminDashboard" element={<AdminDashboard />} />
        <Route path="utilisateur" element={<GestionUtilisateur />} />
        <Route path="boutique" element={<GestionBoutique />} />
        <Route path="reglages" element={<GestionReglages />} />

        {/* Redirection par défaut */}
        <Route index element={<Navigate to="adminDashboard" replace />} />
        <Route path="*" element={<Navigate to="adminDashboard" replace />} />
      </Route>
    </Routes>
  )
}

export default AdminRoutes
