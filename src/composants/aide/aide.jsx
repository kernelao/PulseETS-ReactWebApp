import React from 'react';
import './aide.css';

const Aide = () => {
  return (
    <div className="aideMain">
      <h2>Support &amp; assistance</h2>
      <div className="aideContact">
        <h3>Nous contacter</h3>


        <p>Veuillez saisir votre courriel</p>
        <input 
          type="email" 
          id="aideEmail" 
          placeholder="Votre courriel" 
        />

        <p>Signalez un bug ou posez une question</p>
        <textarea 
          className="aideInput" 
          placeholder="Écrire votre message..." 
        />

        <button className="aideBouton">Envoyer</button>
      </div>
    </div>
  );
};

export default Aide;
