import React from 'react'
import './Navbar_accueil.css'
import logo1 from './logo1.svg'
import LoginForm from '../Authentification/LoginForm'
const Navbar_accueil = () => {
  return (
    <div className='nav_container'>

       
          <img src={logo1} className='logo_pulse' alt="logoPulse" />
     

        <div className='btn_container'>

          <a>
            <button className='btn_connexion'>Connexion</button>
          </a>
          <a >

            <button className='btn_com_mtn'>Commencer maintenant</button>

          </a>
        </div>
       
    </div>
  )
}

export default Navbar_accueil