import React, { useState } from 'react'
import Logo from '../../composants/logo/Logo'
import Navbar from '../../composants/navbar/Navbar'
import Bouton from '../../composants/bouton/Bouton'
import './header.css'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false) // État pour suivre si le menu est ouvert

  return (
    <header className={`header ${isMenuOpen ? 'menu-open' : ''}`}>
      <div className="header__logo">
        <Logo />
      </div>

      <div className="header__nav">
        {/* Passe `setIsMenuOpen` pour que Navbar puisse informer Header */}
        <Navbar onToggleMenu={setIsMenuOpen} />
      </div>

      {/* Cacher les boutons quand le menu burger est ouvert */}
      {!isMenuOpen && (
        <div className="header__buttons">
          <Bouton to="/connexion" text="Se connecter" variant="bouton-fonce" />
          <Bouton to="/inscription" text="S'inscrire" variant="bouton-clair" />
        </div>
      )}
    </header>
  )
}

export default Header
