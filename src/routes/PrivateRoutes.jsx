import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import SidebarLayout from '../composants/sidebar/SidebarLayout'
import { UserSidebarData } from '../composants/sidebar/UserSidebarData'

// Pages utilisateur
import Dashboard from "../pages/utilisateur/Dashboard";
import Profil from "../pages/utilisateur/Profil";
import Reglages from "../pages/utilisateur/Reglages";
import Pomodoro from "../pages/utilisateur/Pomodoro";
import Notes from "../pages/utilisateur/Notes";
import Taches from "../pages/utilisateur/Taches";
import Boutique from "../pages/utilisateur/Boutique";
import Aide from "../pages/utilisateur/Aide";

const PrivateRoutes = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) return <Navigate to="/connexion" replace />

  return (
    <Routes>
      <Route element={<SidebarLayout data={UserSidebarData} />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profil" element={<Profil />} />
        <Route path="reglages" element={<Reglages />} />
        <Route path="pomodoro" element={<Pomodoro />} />
        <Route path="notes" element={<Notes />} />
        <Route path="taches" element={<Taches />} />
        <Route path="boutique" element={<Boutique />} />
        <Route path="aide" element={<Aide />} />

        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="*" element={<Navigate to="dashboard" replace />} />
      </Route>
    </Routes>
  )
}

export default PrivateRoutes
