import {
  FaTachometerAlt,
  FaClock,
  FaStickyNote,
  FaTasks,
  FaUser,
  FaCogs,
  FaStore,
  FaQuestionCircle,
} from 'react-icons/fa'

export const UserSidebarData = [
  {
    title: 'Dashboard',
    path: '/app/dashboard',
    icon: <FaTachometerAlt />,
    cName: 'nav-text',
  },
  {
    title: 'Profil',
    path: '/app/profil',
    icon: <FaUser />,
    cName: 'nav-text',
  },
  {
    title: 'Pomodoro',
    path: '/app/pomodoro',
    icon: <FaClock />,
    cName: 'nav-text',
  },
  {
    title: 'Notes',
    path: '/app/notes',
    icon: <FaStickyNote />,
    cName: 'nav-text',
  },
  {
    title: 'Tâches',
    path: '/app/taches',
    icon: <FaTasks />,
    cName: 'nav-text',
  },
  {
    title: 'Réglages',
    path: '/app/reglages',
    icon: <FaCogs />,
    cName: 'nav-text',
  },
  {
    title: 'Boutique',
    path: '/app/boutique',
    icon: <FaStore />,
    cName: 'nav-text',
  },
  {
    title: 'Aide',
    path: '/app/aide',
    icon: <FaQuestionCircle />,
    cName: 'nav-text',
  },
]
