import React, { useContext, useState } from "react";
import "./Settings.css";
import Navbar from "../../composants/navbar/Navbar.jsx";
import horloge from "../../assets/horloge.svg";  //icone d'horloge
import Pinceau from "../../assets/pinceau.svg";  //icone de pinceau
import { ThemeContext } from "../../context/ThemeContext"; //pour le changement de themes

const Settings = () => {
  const { theme, changeTheme } = useContext(ThemeContext);
  const [pomodoro, setPomodoro] = useState(25);
  const [pauseCourte, setPauseCourte] = useState(5);
  const [pauseLongue, setPauseLongue] = useState(15);
  const [themeChoisi, setThemeChoisi] = useState(theme);

  const handleSubmit = (e) => { //pour le choix de theme
    e.preventDefault();
    changeTheme(themeChoisi);
  };

  return (

    <div id="main" className={theme.replace(" ", "-").toLowerCase()}>

      <Navbar />

      <div id="parametres">
        <h2 id="titreMain">Paramètre</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <section id="minuteur">
            <div id="minuteurTitre">
              <img src={horloge} alt="Paramètres du minuteur" id="horloge" />
              <h3>Minuteur</h3>
            </div>
            <div id="parametresMinuteur">
              {[
                { label: "Pomodoro", value: pomodoro, setter: setPomodoro },
                { label: "Pause Courte", value: pauseCourte, setter: setPauseCourte },
                { label: "Pause Longue", value: pauseLongue, setter: setPauseLongue },
              ].map((item, index) => (
                <label key={index}>
                  <span>{item.label}</span>
                  <input
                    className="minuteurChoix"
                    type="number"
                    value={item.value}
                    onChange={(e) => item.setter(e.target.value)}
                  />
                </label>
              ))}
            </div>
          </section>

          <hr id="ligne2" />

          <section id="theme">
            <div id="themeTitre">
              <img src={Pinceau} alt="Changer le thème" id="Pinceau" />
              <h3>Changer le thème</h3>
            </div>
            <label id="nomTheme">
              <span>Nom :</span>
              <select
                id="choixTheme"
                value={themeChoisi}
                onChange={(e) => setThemeChoisi(e.target.value)}
              >
                <option value="Mode zen">Mode zen</option>
                <option value="Mode nuit">Mode nuit</option>
                <option value="Mode jour">Mode jour</option>
              </select>
            </label>
          </section>

          <div id="boutonEnregistrerConteneur">
            <button type="submit" id="boutonEnregistrer">
              Enregistrer les changements
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;