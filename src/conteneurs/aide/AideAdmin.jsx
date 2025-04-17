import React, { useEffect, useState } from 'react';
import axios from './../../api/Axios';
import './aideadmin.css';

const AideAdmin = () => {
  const [messages, setMessages] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reponseAdmin, setReponseAdmin] = useState('');
  const [prioriteFiltre, setPrioriteFiltre] = useState('');
  const [typeFiltre, setTypeFiltre] = useState('');
  const [statutFiltre, setStatutFiltre] = useState('');
  const [triDate, setTriDate] = useState('desc');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get('/aide')
        setMessages(res.data)
      } catch (err) {
        console.error("Erreur de chargement des messages :", err)
      }
    }
  
    fetchMessages()
  }, []);

  const enregistrerReponse = async () => {
    try {
      await axios.put(`/aide/${selected.id}/reponse`, {
        reponse: reponseAdmin,
        statut: selected.statut
      });

      const maj = messages.map(m =>
        m.id === selected.id
          ? { ...m, reponse: reponseAdmin, statut: selected.statut }
          : m
      );
      setMessages(maj);
      setSelected(null);
      setReponseAdmin('');
    } catch (err) {
      console.error(err);
    }
  };

  const messagesFiltres = messages
    .filter(m => !prioriteFiltre || m.priorite == prioriteFiltre)
    .filter(m => !typeFiltre || m.type === typeFiltre)
    .filter(m => !statutFiltre || m.statut === statutFiltre)
    .sort((a, b) => {
      if (!a.date || !b.date) return 0;
      return triDate === 'asc'
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    });

  return (
    <div className="admin-aide-container">
      <h2>Messages reçus</h2>

      <div className="admin-aide-filtres">
        <label>
          Priorité :
          <select value={prioriteFiltre} onChange={(e) => setPrioriteFiltre(e.target.value)}>
            <option value="">Toutes</option>
            {[1, 2, 3, 4, 5].map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        </label>

        <label>
          Type :
          <select value={typeFiltre} onChange={(e) => setTypeFiltre(e.target.value)}>
            <option value="">Tous</option>
            <option value="question">Question</option>
            <option value="bug">Bug</option>
            <option value="suggestion">Suggestion</option>
            <option value="autre">Autre</option>
          </select>
        </label>

        <label>
          Statut :
          <select value={statutFiltre} onChange={(e) => setStatutFiltre(e.target.value)}>
            <option value="">Tous</option>
            <option value="nouveau">Nouveau</option>
            <option value="en_cours">En cours</option>
            <option value="resolu">Résolu</option>
          </select>
        </label>

        <label>
          Tri date :
          <select value={triDate} onChange={(e) => setTriDate(e.target.value)}>
            <option value="desc">Plus récents</option>
            <option value="asc">Plus anciens</option>
          </select>
        </label>
      </div>

      <div className="admin-aide-table-wrapper">
  <table className="admin-aide-table">
    <thead>
    <tr>
  <th>ID</th>
  <th>User</th>
  <th>Nom</th>
  <th>Objet</th>
  <th>Type</th>
  <th>Priorité</th>
  <th>Date</th>
  <th>Statut</th>
  <th>Voir</th>
</tr>

    </thead>
    <tbody>
    {messagesFiltres.map((msg) => (
  <tr key={msg.id}>
    <td>{msg.id}</td>
    <td>{msg.user?.id || '—'}</td>
    <td>{msg.user?.username || '—'}</td>
    <td>{msg.objet}</td>
    <td>{msg.type}</td>
    <td>{msg.priorite}</td>
    <td>{new Date(msg.date).toLocaleDateString()}</td>
    <td>{msg.statut}</td>
    <td>
      <button onClick={() => setSelected(msg)}>Voir</button>
    </td>
  </tr>
))}

    </tbody>
  </table>
</div>

      {selected && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-btn" onClick={() => setSelected(null)}>
              Fermer
            </button>
            <h3>Détail du message</h3>
            <p><strong>ID :</strong> {selected.id}</p>
            <p><strong>Objet :</strong> {selected.objet}</p>
            <p><strong>Type :</strong> {selected.type}</p>
            <p><strong>Priorité :</strong> {selected.priorite}</p>
            <p><strong>Date :</strong> {new Date(selected.date).toLocaleString()}</p>
            <p><strong>Contenu :</strong> {selected.contenu}</p>

            <div className="ligne-statut">
  <label htmlFor="statut-select"><strong>Statut :</strong></label>
  <select
    id="statut-select"
    value={selected.statut}
    onChange={(e) =>
      setSelected((prev) => ({ ...prev, statut: e.target.value }))
    }
  >
    <option value="nouveau">Nouveau</option>
    <option value="en_cours">En cours</option>
    <option value="resolu">Résolu</option>
  </select>
</div>


            <div className="admin-reponse-zone">
              <label>Réponse :</label>
              <textarea
                placeholder="Écrire une réponse..."
                value={reponseAdmin}
                onChange={(e) => setReponseAdmin(e.target.value)}
              />
            </div>

            <button className="btn-resolu" onClick={enregistrerReponse}>
              Enregistrer la réponse
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AideAdmin;