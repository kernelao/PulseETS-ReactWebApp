import React, { useContext, useState, useEffect } from "react";
import "../../components/Layout/Reglages/Reglages.css";
import horloge from "../../assets/horloge.svg";  //icone d'horloge
import Pinceau from "../../assets/pinceau.svg";  //icone de pinceau
import { ThemeContext } from "../../context/ThemeContext"; //pour le changement de themes
import { useOutletContext } from 'react-router-dom';
import { useAuth } from "../../context/AuthContext"; // pour utiliser le token
//import axios from 'axios';
import axios from '../../api/Axios';


const Reglages = () => {

  const { theme, changeTheme } = useContext(ThemeContext);
  //const [pomodoro, setPomodoro] = useState(25);
  //const [pauseCourte, setPauseCourte] = useState(5);
  //const [pauseLongue, setPauseLongue] = useState(15);
  const [themeChoisi, setThemeChoisi] = useState(theme);
  const { pomodoro, setPomodoro, pauseCourte, setPauseCourte, pauseLongue, setPauseLongue } = useOutletContext();
  const [reglageId, setReglageId] = useState(null);

  const { token, isAuthenticated } = useAuth(); // on récupère le token JWT
  if (!isAuthenticated) return <Navigate to="/connexion" />;

  useEffect(() => {
    if (!token) {
      console.warn("Pas de token trouvé !");
      return;
    }

    async function fetchOrCreateReglage() {
      try {
        console.log("Token dans useEffect :", token); // 👈 log ici
        const res = await axios.get(`/reglages/me`);
        /*, {
          headers: { Authorization: `Bearer ${token}` },
        });*/

        console.log("Réponse reçue :", res.data); // 👈 log ici
  
        const reglage = res.data;
  
        setPomodoro(reglage.pomodoro);
        setPauseCourte(reglage.courtePause);
        setPauseLongue(reglage.longuePause);
        setThemeChoisi(reglage.theme);
        changeTheme(reglage.theme);
        setReglageId(reglage.id);
      } catch (err) {
        console.error("Erreur lors du chargement des réglages :", err);
      }
    }
  
    fetchOrCreateReglage();
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
          short_break: parseInt(pauseCourte),
          long_break: parseInt(pauseLongue),
          theme: themeChoisi,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          }
        }
      );
  
      alert("Réglages sauvegardés !");
    } catch (error) {
      console.error("Erreur Axios complète :", error);
      alert("Erreur : " + JSON.stringify(error.response?.data || error.message));
    }
  };
  
  
  return (
    <div id="app">
    <div id="mainReglages" className={(theme|| "").replace(" ", "-").toLowerCase()}>

      <div id="reglages">
        <h2 id="titreMainReglages">Réglages</h2>
        <hr className="barreReglages"/>
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
                onChange={(e) => setThemeChoisi(e.target.value)}
              >
                <option value="Mode zen">Mode zen</option>
                <option value="Mode nuit">Mode nuit</option>
                <option value="Mode jour">Mode jour</option>
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
}

export default Reglages