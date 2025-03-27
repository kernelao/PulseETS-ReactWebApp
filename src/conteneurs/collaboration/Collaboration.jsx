import React from 'react'
import './collaboration.css'

// Importation des images de collab
import ets from '../../assets/collab/ets.png'
import react from '../../assets/collab/react.png'
import azure from '../../assets/collab/azure.png'
import symfony from '../../assets/collab/symfony.png'
import sql from '../../assets/collab/sql.png'

const Collaboration = () => {
  return (
    <div className="collaboration">
      <div>
        <img src={ets} alt="ets" />
      </div>
      <div>
        <img src={react} alt="react" />
      </div>
      <div>
        <img src={azure} alt="azure" />
      </div>
      <div>
        <img src={symfony} alt="symfony" />
      </div>
      <div>
        <img src={sql} alt="sql" />
      </div>
    </div>
  )
}

export default Collaboration
