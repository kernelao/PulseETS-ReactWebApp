import React from 'react';
import './cta.css';
import Bouton from '../../composants/bouton/Bouton';

const CTA = () => {
  return (
    <div className='cta'>
        
        
        
        <div className="cta-contenu">
            <p>Obtenez un accès anticipé pour essayer</p>

            <h3>Inscrivez-vous aujourd'hui et commencez à explorer une infinité de possibilités.</h3>
        </div>
        
        <div className="cta-bouton">
          <Bouton to="/inscription" text="Essayer maintenant" variant="bouton-clair taille-hero" />
        </div>
        
    
    </div>
  )
}

export default CTA