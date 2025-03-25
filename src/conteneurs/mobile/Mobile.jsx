import React from 'react';
import { Link } from 'react-router-dom';
import mobileImage from '../../assets/images/image11.png';
import './mobile.css';

const Mobile = () => {
  return (
    <div className='mobile'>

        <div className="mobile-image">
            <img src={mobileImage} alt="nouveautee" />
        </div>

        <div className="mobile-contenu">

            <Link to="/inscription" className="explorer">Pulse dans votre poche !</Link>
            <h2 className="mobile-texte">Pulse dans votre poche !</h2>

            <p>Ayez accès à la toute nouvelle version de Pulse. Disponible sur les téléphones mobile pour une meilleure intégration!</p>
            <h3 className="mobile-texte">Disponible sur tous les Androids.</h3>
            <Link to="/inscription" className="explorer">Commencez l'expérience</Link>
            

        </div>

    </div>
  )
}

export default Mobile