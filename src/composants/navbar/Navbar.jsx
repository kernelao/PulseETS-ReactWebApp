import React from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css'
import { useState } from 'react'

const Navbar = ({ onToggleMenu }) => {
  const [showLinks, setShowLinks] = useState(false)

  const handleShowLinks = () => {
    const newState = !showLinks

    setShowLinks(newState) // On modifie si il est a true, sinon on le laisse à false

    if (onToggleMenu) {
      onToggleMenu(newState) // Met à jour `isMenuOpen` dans Header.jsx
    }
  }

  return (
    <nav className={`navbar ${showLinks ? 'show-navbar' : ''}`}>
      <ul className="navbar__links">
        <li className="navbar__item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? 'navbar__link active' : 'navbar__link'
            }
          >
            Accueil
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            to="/fonctionnalites"
            className={({ isActive }) =>
              isActive ? 'navbar__link active' : 'navbar__link'
            }
          >
            Fonctionnalités
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            to="/a-propos"
            className={({ isActive }) =>
              isActive ? 'navbar__link active' : 'navbar__link'
            }
          >
            À Propos
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            to="/faq"
            className={({ isActive }) =>
              isActive ? 'navbar__link active' : 'navbar__link'
            }
          >
            FAQ
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            to="/blog"
            className={({ isActive }) =>
              isActive ? 'navbar__link active' : 'navbar__link'
            }
          >
            Blog
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            to="/temoignages"
            className={({ isActive }) =>
              isActive ? 'navbar__link active' : 'navbar__link'
            }
          >
            Témoignages
          </NavLink>
        </li>
        <li className="navbar__item">
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive ? 'navbar__link active' : 'navbar__link'
            }
          >
            Contact
          </NavLink>
        </li>
      </ul>

      {/* Burger Menu */}
      <button className="navbar__burger" onClick={handleShowLinks}>
        <span className="burger-bar"></span>
      </button>
    </nav>
  )
}

export default Navbar
