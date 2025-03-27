import React, { useContext, useState } from "react";
import "../../components/Layout/Reglages/Reglages.css";
import Navbar from "../../composants/navbar/Navbar.jsx";
import horloge from "../../assets/horloge.svg";  //icone d'horloge
import Pinceau from "../../assets/pinceau.svg";  //icone de pinceau
import { ThemeContext } from "../../context/ThemeContext"; //pour le changement de themes

const Reglages = () => {

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

    <div id="mainReglages" className={(theme|| "").replace(" ", "-").toLowerCase()}>

      <Navbar />

      <div id="reglages">
        <h2 id="titreMainReglages">Paramètre</h2>
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
  );
}

export default Reglages
