import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { IconContext } from 'react-icons'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import './sidebar.css'

const SidebarLayout = ({ data }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  const [pomodoro, setPomodoro] = useState(25);
  const [pauseCourte, setPauseCourte] = useState(5);
  const [pauseLongue, setPauseLongue] = useState(15);

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
