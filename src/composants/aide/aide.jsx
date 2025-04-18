import React, { useState, useContext } from 'react';
import './aide.css';
import axios from './../../api/Axios';
import { ThemeContext } from "../../context/ThemeContext";

const AideMain = () => {
  const { theme } = useContext(ThemeContext);
  const themeClass = theme.toLowerCase().replace(" ", "-");

  const [objet, setObjet] = useState('');
  const [type, setType] = useState('question');
  const [message, setMessage] = useState('');
  const [priorite, setPriorite] = useState(3);
  const [feedback, setFeedback] = useState('');
  const [historique, setHistorique] = useState([]);
  const [afficherHistorique, setAfficherHistorique] = useState(false);

  const envoyerMessage = async () => {
    if (!message.trim() || !objet.trim()) {
      setFeedback("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    try {
      await axios.post('/aide', {
        objet,
        type,
        contenu: message,
        priorite
      });

      setFeedback("Message envoyé avec succès !");
      setObjet('');
      setType('question');
      setMessage('');
      setPriorite(3);
    } catch (err) {
      console.error(err);
      setFeedback("Erreur lors de l'envoi du message.");
    }
  };

  const chargerHistorique = async () => {
    try {
      const res = await axios.get('/aide/utilisateur');

      if (Array.isArray(res.data)) {
        setHistorique(res.data);
        setAfficherHistorique(true);
      } else {
        throw new Error('Réponse inattendue du serveur.');
      }
    } catch (err) {
      console.error("Erreur lors du chargement de l'historique :", err);
      setFeedback("Erreur lors du chargement de l'historique.");
    }
  };

  return (
    <div className={`aideMain mode-${themeClass}`}>
      <div className="aideContact">
        <h2>Nous contacter</h2>

        <div className="aideLigne">
          <label>Objet *</label>
          <input
            type="text"
            className="aideInput"
            placeholder="Objet du message"
            value={objet}
            onChange={(e) => setObjet(e.target.value)}
          />
        </div>

        <div className="aideLigne">
          <label>Type de demande *</label>
          <select
            className="aideInput aideInputShort"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="question">Question</option>
            <option value="bug">Signaler un bug</option>
            <option value="suggestion">Suggestion</option>
            <option value="autre">Autre</option>
          </select>
        </div>

        <div className="aideLigne">
          <label>Priorité *</label>
          <div className="aidePriorite">
            {[1, 2, 3, 4, 5].map((val) => (
              <label key={val} className="prioriteRadio">
                <input
                  type="radio"
                  name="priorite"
                  value={val}
                  checked={priorite === val}
                  onChange={() => setPriorite(val)}
                />
                {val}
              </label>
            ))}
          </div>
        </div>

        <div className="aideLigne">
          <label>Message *</label>
          <textarea
            className="aideInput"
            placeholder="Écrire votre message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button className="aideBouton" onClick={envoyerMessage}>
            Envoyer
          </button>
          <button className="aideBouton secondaire" onClick={chargerHistorique}>
            Voir l'historique
          </button>
        </div>

        {feedback && <p className="aideFeedback">{feedback}</p>}

        {afficherHistorique && (
          <div className="modal-overlay">
            <div className="modal-content">
              <button className="modal-close-btn" onClick={() => setAfficherHistorique(false)}>
                Fermer
              </button>
              <h3>Historique de vos messages</h3>
              <ul className="historiqueListe">
                {[...historique]
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((msg) => (
                    <li key={msg.id} className="messageCard">
                      <div className="messageHeader">
                        <div className="objet">{msg.objet}</div>
                        <div className="date">{msg.date ? new Date(msg.date).toLocaleString() : '—'}</div>
                      </div>

                      <div className="messageBody">
                        <p><strong>Message :</strong> {msg.contenu}</p>
                        <p><strong>Priorité :</strong> {msg.priorite}</p>
                      </div>

                      {msg.reponse && (
                        <div className="reponseBloc">
                          <strong>Réponse de l’équipe :</strong>
                          <p>{msg.reponse}</p>
                        </div>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AideMain;
