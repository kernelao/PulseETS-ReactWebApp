import React from 'react';
import './aide.css';

const aide = () => {
  return (
    <div className="support-container">
      <h2>Support &amp; assistance</h2>
      <div className="contact-section">
        <h3>Nous contacter</h3>
        <p>Signalez un bug ou posez une question</p>
        <textarea 
          className="message-input" 
          placeholder="Écrire votre message..." 
        />
        <button className="send-button">Envoyer</button>
      </div>
    </div>
  );
};

export default aide;
