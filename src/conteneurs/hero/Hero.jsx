import React from 'react'
import './Hero.css'
import Bouton from '../../composants/bouton/Bouton'

const Hero = () => {
  return (
    <div className="hero">
      <div className="conteneur">
        <div className="contenu">
          <h1>
            {' '}
            <em>pro</em>
            <b>PULSE</b> ta productivité
          </h1>
          <p>
            {' '}
            Avec PULSE, booste ta productivité, reste concentré et atteins tes
            objectifs avec style. Une méthode intelligente, un design motivant…
            il ne te reste qu’à essayer !
          </p>
          <Bouton
            to="/inscription"
            text="Commencer maintenant"
            variant="bouton-fonce taille-hero"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
