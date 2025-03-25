import React from 'react';
import './mission.css';
import { Link } from 'react-router-dom';
import Effet from '../../composants/effet/Effet';

const Mission = () => {
  return (
    <div className='mission'>

        <div className="effet">
            <Effet 
                title="Plus qu'une simple méthode" 
                text="Des recherches montrent que les pauses sytématiques, comme celle de la technique Pomodoro, apportent des bénéfices sur l'humeur et l'efficacité du travail."
            />
        </div>

        <div className="titre">
            <h2 className="text">
                Approuvé par la science, <br /> efficace pour tous
            </h2>
            <Link to="/blog" className="explorer">Explorer le blog</Link>
            
        </div>

        <div className="bloc">
            <Effet 
                title="Simplicité" 
                text="Des recherches montrent que les sytématiques, comme celle de la technique."
            />
            <Effet 
                title="Tout en 1" 
                text="Des recherches montrent que les sytématiques, comme celle de la technique."
            />
            <Effet 
                title="Organsation" 
                text="Des recherches montrent que les sytématiques, comme celle de la technique."
            />
        </div>

    </div>
  )
}

export default Mission