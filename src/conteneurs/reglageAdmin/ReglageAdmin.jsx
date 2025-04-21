import React, { useEffect, useState } from 'react';
import './ReglageAdmin.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from '../../api/Axios';

const ReglagesAdmin = () => {
  const [pomodoro, setPomodoro] = useState(25);
  const [pauseCourte, setPauseCourte] = useState(5);
  const [pauseLongue, setPauseLongue] = useState(15);
  const [theme, setTheme] = useState('Mode zen');
  const [id, setId] = useState(null);

  // Charger les réglages actuels
  useEffect(() => {
    axios.get('/admin/reglages')
      .then(res => {
        const data = res.data;
        console.log("Réglages reçus :", data); //  debug ici
        setPomodoro(data.pomodoro);
        setPauseCourte(data.courte_pause);
        setPauseLongue(data.longue_pause);
        setTheme(data.theme);
        setId(data.id); // important 
      })
      .catch(err => {
        toast.error("Erreur lors du chargement des réglages.");
        console.error(err);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // if (!id) {
    //   toast.error("Impossible de sauvegarder : aucun ID reçu.");
    //   return;
    // }

    try {
      await axios.put("/admin/reglages", {
        pomodoro,
        courte_pause: pauseCourte,
        longue_pause: pauseLongue,
        theme
      });

      toast.success("Réglages sauvegardés !");
    } catch (err) {
      toast.error("Erreur lors de la sauvegarde.");
      console.error(err);
    }
  };

  const resetDefaults = () => {
    setPomodoro(25);
    setPauseCourte(5);
    setPauseLongue(15);
    setTheme("Mode zen");
  };

  return (
    <div className="admin-reglages-page">
      <div className="admin-reglages-container">
        <h2>Réglages par défaut des nouveaux utilisateurs</h2>
        <form className="admin-reglages-form" onSubmit={handleSubmit}>
          <div className="reglage-group">
            <label>Durée Pomodoro (min)</label>
            <input type="number" value={pomodoro} onChange={(e) => setPomodoro(e.target.value)} min="1" />
          </div>

          <div className="reglage-group">
            <label>Pause courte (min)</label>
            <input type="number" value={pauseCourte} onChange={(e) => setPauseCourte(e.target.value)} min="1" />
          </div>

          <div className="reglage-group">
            <label>Pause longue (min)</label>
            <input type="number" value={pauseLongue} onChange={(e) => setPauseLongue(e.target.value)} min="1" />
          </div>

          <div className="reglage-group reglage-full-width">
            <label>Thème par défaut</label>
            <select value={theme} onChange={(e) => setTheme(e.target.value)}>
              <option value="Mode zen">Mode zen</option>
              <option value="Mode nuit">Mode nuit</option>
              <option value="Mode jour">Mode jour</option>
            </select>

            <div className="theme-preview reglage-full-width">
              <p>Aperçu du thème visuel :</p>
              <div className={`theme-box ${theme.replace(" ", "-").toLowerCase()}`}></div>
            </div>
          </div>

          <div className="reglage-full-width boutons-actions">
            <button className="btn-reset" type="button" onClick={resetDefaults}>
              Réinitialiser
            </button>
            <button className="btn-admin-save" type="submit">
              Enregistrer les réglages
            </button>
          </div>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} closeOnClick pauseOnHover draggable />
    </div>
  );
};

export default ReglagesAdmin;
