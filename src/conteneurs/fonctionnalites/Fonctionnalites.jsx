import React from 'react';
import './fonctionnalites.css';
import { Link } from 'react-router-dom';
import Effet from '../../composants/effet/Effet';

const fonctionnalitesContenu = [
    {
        title: 'Pomodoro',
        text: 'Choisissez vos séances pour une meilleure productivité',
    },
    {
        title: 'Tâches',
        text: 'Planifiez et terminez vos taches en toute simplicité',
    },
    {
        title: 'Notes',
        text: 'Prenez des notes rapidement et restez structuré',
    },
    {
        title: 'Statistiques',
        text: 'Suivez vos progrès et débloquez des récompenses en restant concentré',
    }
]

const Fonctionnalites = () => {
  return (
    <div className="fonctionnalites">
        
        <div className="fonctionnalites-titre">
            <h2 className="fonctionnalites-titre-texte">
                Plus qu'un outil, il est votre compagnon intelligent! N'attendez plus.
            </h2>
            <Link to="/inscription" className="explorer">Créer un compte gratuitement</Link>
            
        </div>


        <div className="fonctionnalites-conteneur">

            {fonctionnalitesContenu.map((item, index) => (
                <Effet title={item.title} text={item.text} key={item.title + index}/>
            ))}


        </div>
        



    </div>
  )
}

export default Fonctionnalites