import React from 'react'
import './effet.css'

const Effet = ({ title, text }) => {
  return (
    <div className="effet-conteneur">
      <div className="effet-conteneur-titre">
        <div />
        <h3>{title}</h3>
      </div>

      <div className="effet-conteneur-texte">{text}</div>
    </div>
  )
}

export default Effet
