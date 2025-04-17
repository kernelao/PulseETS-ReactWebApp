import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { IconContext } from 'react-icons'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import './sidebar.css'
import { useAuth } from '../../context/AuthContext'
import { FaSignOutAlt } from 'react-icons/fa'

const SidebarLayout = ({ data }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const [pomodoro, setPomodoro] = useState(25);
  const [pauseCourte, setPauseCourte] = useState(5);
  const [pauseLongue, setPauseLongue] = useState(15);

  const { logout } = useAuth()

  return (
    <IconContext.Provider value={{ color: '#fff' }}>
      <div className="sidebar-layout">
        {/* Menu Burger ou X */}
        <div className="sidebar-navbar">
          <Link to="#" className="menu-bars" onClick={toggleSidebar}>
            {sidebarOpen ? <AiIcons.AiOutlineClose /> : <FaIcons.FaBars />}
          </Link>
        </div>

        {/* Sidebar */}
        <nav className={sidebarOpen ? 'nav-menu active' : 'nav-menu'}>
          <div className="nav-menu-items-container">
            <ul className="nav-menu-items">
              {data.map((item, index) => (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
            </ul>

            <ul className="nav-menu-bottom">
              <li className="nav-text logout-item" onClick={logout}>
                <Link to="#">
                  <FaSignOutAlt />
                  <span>Déconnexion</span>
                </Link>
              </li>
            </ul>
          </div>
      </nav>


        {/* Contenu principal */}
        <div className={`main-content ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <Outlet context={{ pomodoro, setPomodoro, pauseCourte, setPauseCourte, pauseLongue, setPauseLongue }} />
        </div>
      </div>
    </IconContext.Provider>
  )
}

export default SidebarLayout
