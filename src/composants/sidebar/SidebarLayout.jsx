import React, { useState, useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { IconContext } from 'react-icons'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import './sidebar.css'
import { useAuth } from '../../context/AuthContext'
import { FaSignOutAlt } from 'react-icons/fa'
import { ThemeContext } from "../../context/ThemeContext";
import ThemeWrapper from '../../components/common/ThemeWrapper'

const SidebarLayout = ({ data }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const [pomodoro, setPomodoro] = useState(25);
  const [pauseCourte, setPauseCourte] = useState(5);
  const [pauseLongue, setPauseLongue] = useState(15);
  const { theme } = useContext(ThemeContext);
  const { logout } = useAuth()

  const themeClass = theme.toLowerCase().replace(" ", "-");

  return (
    <ThemeWrapper>
    <IconContext.Provider
      value={{
        color: theme === "mode-jour" || theme === "mode-zen" ? "#000" : "#fff"
      }}
    >
      <div className="sidebar-layout">
        {/* Barre supérieure (menu burger ou X) */}
        <div className={`sidebar-navbar ${themeClass}`}>
        <Link to="#" className="menu-bars" onClick={toggleSidebar}>
  {sidebarOpen ? (
    <AiIcons.AiOutlineClose
      size={32}
      className={`menu-icon ${themeClass}`}
    />
  ) : (
    <FaIcons.FaBars
      size={32}
      className={`menu-icon ${themeClass}`}
    />
  )}
</Link>


        </div>

        {/* Sidebar */}
        <nav className={`nav-menu ${sidebarOpen ? 'active' : ''} ${themeClass}`}>
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
                  <span className={`logout-label ${themeClass}`}>
                    Déconnexion
                  </span>
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
    </ThemeWrapper>
  )
}

export default SidebarLayout
