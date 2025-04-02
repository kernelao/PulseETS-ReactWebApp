import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logos/logo-v6.svg'
import './logo.css'

const Logo = () => {
  return (
    <div className="logo">
      <Link to="/">
        <img src={logo} alt="Logo de PULSE" className="logo-img" />
      </Link>
    </div>
  )
}

export default Logo
