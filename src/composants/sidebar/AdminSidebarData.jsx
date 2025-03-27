import { FaTachometerAlt, FaUsers, FaCogs, FaStore } from 'react-icons/fa'

export const AdminSidebarData = [
  {
    title: 'Dashboard',
    path: '/admin/adminDashboard',
    icon: <FaTachometerAlt />,
    cName: 'nav-text',
  },
  {
    title: 'Utilisateurs',
    path: '/admin/utilisateur',
    icon: <FaUsers />,
    cName: 'nav-text',
  },
  {
    title: 'Réglages',
    path: '/admin/reglages',
    icon: <FaCogs />,
    cName: 'nav-text',
  },
  {
    title: 'Boutique',
    path: '/admin/boutique',
    icon: <FaStore />,
    cName: 'nav-text',
  },
]
