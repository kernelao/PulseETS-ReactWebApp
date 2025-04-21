import React, { useContext, useState, useEffect } from "react";
import "./reglages.css";
import horloge from "../../assets/horloge.svg";
import Pinceau from "../../assets/pinceau.svg";
import { ThemeContext } from "../../context/ThemeContext";
import { useOutletContext, Navigate } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext";
import axios from '../../api/Axios';

const Reglages = () => {
  const { theme, changeTheme } = useContext(ThemeContext);
  const [themeChoisi, setThemeChoisi] = useState(theme);
  const { pomodoro, setPomodoro, pauseCourte, setPauseCourte, pauseLongue, setPauseLongue } = useOutletContext();
  const [reglageId, setReglageId] = useState(null);
  const [unlockedThemes, setUnlockedThemes] = useState([]);
  const { token, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Navigate to="/connexion" />;

  useEffect(() => {
    if (!token) return;

    async function fetchData() {
      try {
        const res = await axios.get(`/reglages/me`);
        /*, {
          headers: { Authorization: `Bearer ${token}` },
        });*/

        console.log("Réponse reçue :", res.data); // 👈 log ici
  
        const reglage = res.data;
        setPomodoro(reglage.pomodoro);
        setPauseCourte(reglage.courte_pause ?? 5);
        setPauseLongue(reglage.longue_pause ?? 15);
        setThemeChoisi(reglage.theme);
        changeTheme(reglage.theme);
        setReglageId(reglage.id);

        const profileRes = await axios.get('/boutique/profile');
        setUnlockedThemes(profileRes.data.unlockedThemes || []);
      } catch (err) {
        console.error("Erreur lors du chargement des réglages :", err);
      }
    }

    fetchData();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    changeTheme(themeChoisi);
  
    console.log("Token envoyé au PUT :", token); // 👈 ici aussi
  

    if (!reglageId) {
      console.error("ID manquant, reglageId =", reglageId); // 👈 Ajoute ça
      alert("ID du réglage non défini !");
      return;
    }

    try {
      await axios.put(
        `/reglages/${reglageId}`,
        {
          pomodoro: parseInt(pomodoro),
          courte_pause: parseInt(pauseCourte),
          longue_pause: parseInt(pauseLongue),
          theme: themeChoisi,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      alert("Erreur : " + JSON.stringify(error.response?.data || error.message));
    }
  };

  return (
    <div id="app">
      <div id="mainReglages" className={`mode-${(theme || "").toLowerCase().replace(/\s+/g, "-")}`}>
        <div id="reglages">
          <h2 id="titreMainReglages">Réglages</h2>
          <hr className="barreReglages" />
          <form onSubmit={handleSubmit}>
            <section id="minuteurReglages">
              <div id="minuteurTitreReglages">
                <img src={horloge} alt="Paramètres du minuteur" id="horlogeMinuteur" />
                <h3 className="sousTitreReglages">Minuteur</h3>
              </div>
              <div id="reglagesMinuteur">
                {[
                  { label: "Pomodoro", value: pomodoro, setter: setPomodoro },
                  { label: "Pause Courte", value: pauseCourte, setter: setPauseCourte },
                  { label: "Pause Longue", value: pauseLongue, setter: setPauseLongue },
                ].map((item, index) => (
                  <label key={index} className="labelReglages1">
                    <span className="spanReglages">{item.label}</span>
                    <input
                      className="minuteurChoixReglages"
                      type="number"
                      value={item.value}
                      onChange={(e) => item.setter(e.target.value)}
                    />
                  </label>
                ))}
              </div>
            </section>

            <hr id="ligne2Reglages" />

            <section id="themeReglages">
              <div id="themeTitreReglages">
                <img src={Pinceau} alt="Changer le thème" id="pinceauReglages" />
                <h3 className="sousTitreReglages">Changer le thème</h3>
              </div>
              <label id="nomThemeReglages">
                <span className="spanReglages">Nom :</span>
                <select
                  id="choixThemeReglages"
                  className="selectReglages"
                  value={themeChoisi}
                  onChange={(e) => {
                    setThemeChoisi(e.target.value);
                    changeTheme(e.target.value);
                  }}
                >
                  <option value="Mode zen">Mode zen</option>
                  <option value="Mode nuit">Mode nuit</option>
                  <option value="Mode jour">Mode jour</option>
                  {unlockedThemes.filter(t => !["Mode zen", "Mode nuit", "Mode jour"].includes(t)).map((t, i) => (
                    <option key={i + 100} value={t}>{t}</option>
                  ))}
                </select>
              </label>
            </section>

            <div id="boutonEnregistrerConteneurReglages">
              <button type="submit" id="boutonEnregistrerReglages">
                Enregistrer les changements
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Reglages;
