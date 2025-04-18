import React, { useState, useEffect, useContext } from "react";
import AVATAR from '/src/assets/image_avatar';
import './Boutique.css';
import axios from '../../api/Axios';
import { ThemeContext } from "../../context/ThemeContext";
import "../../components/common/theme.css";
import { ThemeWrapper } from "../../components/common/ThemeWrapper";

const Boutique = () => {
  const [avatars, setAvatars] = useState([]);
  const [themes, setThemes] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [pulsePoints, setPulsePoints] = useState(0);
  const [unlockedAvatars, setUnlockedAvatars] = useState([]);
  const [unlockedThemes, setUnlockedThemes] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [previewTheme, setPreviewTheme] = useState(null);
  const { theme, changeTheme } = useContext(ThemeContext);
  const appliedThemeClass = theme.startsWith("Mode ")
  ? theme.toLowerCase().replace(/\s/g, "-")
  : `theme-${theme.toLowerCase().replace(/\s/g, "-")}`;
const themeClass = theme.toLowerCase().replace(' ', '-');


  const defaultAvatars = [
    { name: "Jon Doe", image: AVATAR.defaultavatar, description: "Jon Doe", cost: 0},
    { name: "Lina", image: AVATAR.avatarchandailrose, description: "Lina", cost: 100},
    { name: "Grey Kid", image: AVATAR.avatarchapeaugris, description: "Grey Kid", cost: 100 },
    { name: "Incognita", image: AVATAR.avatarchapeaushades, description: "Incognita", cost: 150 },
    { name: "Julie", image: AVATAR.avatarcheveuxbleux, description: "Julie", cost: 200 },
    { name: "Roussette", image: AVATAR.avatarcheveuxroux, description: "Roussette", cost: 150},
    { name: "Wild n Serious", image: AVATAR.avatargreenblack, description: "Wild n Serious", cost: 300},
    { name: "Sequelita", image: AVATAR.avatarhatmauve, description: "Sequelita", cost: 100 },
    { name: "80s boy", image: AVATAR.avatarlunettesfancy, description: "80s boy", cost: 300},
    { name: "Kim Possible", image: AVATAR.avatarroussepurplehat, description: "Kim Possible", cost: 200 },
    { name: "Cool guy", image: AVATAR.avatarshades, description: "Cool guy", cost: 250 },
    { name: "Suit man", image: AVATAR.avatarsuits, description: "Suit man", cost: 250 },
    { name: "I am Batman", image: AVATAR.SPECIALbatman, description: "I am Batman", cost: 2500},
    { name: "Suuuuuu", image: AVATAR.SPECIALcr7, description: "Suuuuuu", cost: 2500},
    { name: "Elektra", image: AVATAR.SPECIALfemalesuperhero, description: "Elektra", cost: 2500},
    { name: "Tony Stark aka Ironman", image: AVATAR.SPECIALironman, description: "Tony Stark aka Ironman", cost: 2500},
    { name: "Why so serious?", image: AVATAR.SPECIALjoker, description: "Why so serious?", cost: 2500 },
    { name: "Wild n serious on vacation", image: AVATAR.VIPavatargreenblack, description: "Wild n serious on vacation", cost: 3000},
    { name: "Donna", image: AVATAR.VIPavatarshadescheveuxvert, description: "Donna", cost: 3000},
    { name: "Neon Lights", image: AVATAR.ExclusiveNeon, description: "Neon Lights", cost: 8000},
    { name: "Space Explorer", image: AVATAR.ExclusiveSpaceExplorer, description: "Space Explorer", cost: 2000},
    { name: "Steampunk Voyager", image: AVATAR.ExclusiveSteampunk, description: "Steampunk Voyager", cost: 6000},
    { name: "Viking Warrior", image: AVATAR.ExclusiveWarrior, description: "Viking Warrior", cost: 5500 },
    { name: "Wizard Supreme", image: AVATAR.ExclusiveWizard, description: "Wizard Supreme", cost: 8000 },
  ];

  const defaultThemes = [
    { name: "Cyberpunk", description: "Futuriste et néon.", cost: 300},
    { name: "Steampunk", description: "Old-world charm with a mechanical twist.", cost: 500 },
    { name: "Space", description: "Explore the galaxy.", cost: 700 },
    { name: "Dark Mode", description: "Thème sombre et sobre.", cost: 200 },
    { name: "Neon Lights", description: "Bright, vibrant colors for a lively feel.", cost: 400 },
    { name: "Vintage", description: "Old school retro design.", cost: 350},
    { name: "Minimalist", description: "Design épuré et clair.", cost: 250 },
  ];

  useEffect(() => {
    // Injection des IDs backend dans les avatars locaux
    axios.get('/boutique/avatars')
      .then(res => {
        const enrichedAvatars = defaultAvatars.map(local => {
          const match = res.data.find(api => api.name === local.name);
          return {
            ...local,
            id: match?.id ?? null,
          };
        });
        setAvatars(enrichedAvatars); // <- setAvatars avec les IDs injectés
      })
      .catch(err => console.error("Erreur avatars:", err));
  
    // Injection des IDs backend dans les thèmes locaux
    axios.get('/boutique/themes')
      .then(res => {
        const enrichedThemes = defaultThemes.map(local => {
          const match = res.data.find(api => api.name === local.name);
          return {
            ...local,
            id: match?.id ?? null,
          };
        });
        setThemes(enrichedThemes); // <- setThemes avec les IDs injectés
      })
      .catch(err => console.error("Erreur thèmes:", err));
  
    // Récupère les données du profil
    axios.get('/boutique/profile')
      .then(res => {
        setPulsePoints(res.data.pulsePoints);
        setUnlockedAvatars(res.data.unlockedAvatars);
        setUnlockedThemes(res.data.unlockedThemes);
      })
      .catch(err => console.error("Erreur profil:", err));
      
  }, []);
  
  
  

  const handlePreviewTheme = (theme) => {
    
    const className = theme.name.toLowerCase().replace(/\s/g, '-');
    setPreviewTheme(className);
};


  const handlePurchaseAvatar = async () => {
    console.log("ID à acheter:", selectedAvatar?.id, selectedAvatar);

    if (!selectedAvatar) return;
    setLoading(true);
    try {
      const res = await axios.post(`/user/avatars/buy/${encodeURIComponent(selectedAvatar.name)}`);
      setMessage(res.data.message);
      setUnlockedAvatars([...unlockedAvatars, selectedAvatar.name]);
      setPulsePoints(prev => prev - selectedAvatar.cost);
    } catch (err) {
      setMessage(err.response?.data?.message || "Erreur");
    } finally {
      setLoading(false);
    }
  };

  const handlePurchaseTheme = async () => {
    if (!selectedTheme) return;
    setLoading(true);
    try {
      const res = await axios.post(`/user/themes/buy/${encodeURIComponent(selectedTheme.name)}`);
      setMessage(res.data.message);
      setUnlockedThemes([...unlockedThemes, selectedTheme.name]);
      setPulsePoints(prev => prev - selectedTheme.cost);
    } catch (err) {
      setMessage(err.response?.data?.message || "Erreur");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyTheme = async () => {
    if (!selectedTheme) return;
  
    try {
      // Appliquer dans le backend
      const reglageRes = await axios.get('/reglages/me');
      const reglageId = reglageRes.data.id;
  
      await axios.put(`/reglages/${reglageId}`, {
        pomodoro: reglageRes.data.pomodoro,
        courte_pause: reglageRes.data.courte_pause,
        longue_pause: reglageRes.data.longue_pause,
        theme: selectedTheme.name
      });
  
      // Appliquer dans le frontend (visuel immédiat)
      changeTheme(selectedTheme.name);
      setMessage("Thème appliqué avec succès !");
    } catch (err) {
      console.error("Erreur lors de l'application du thème :", err);
      setMessage(err.response?.data?.message || "Erreur lors de l'application.");
    }
  };
  

  return (
    <ThemeWrapper>
    <div className={`boutiqueContainer ${appliedThemeClass}`}>
      <h1 className="h1Boutique">Boutique</h1>
<div className={`boutiqueContainer ${previewTheme ? 'theme-' + previewTheme : ''} mode-${themeClass}`}>
        <h1 className="h1Boutique">Boutique</h1>
        <p className="points">Points PULSE : {pulsePoints}</p>
        <div className="profile_image">
            <img src={selectedAvatar?.image || AVATAR.defaultavatar} alt="Image de profil" className="profile-img" />
        </div>

        {/* Avatars */}
        <div id="boutique">
            <div id="iconeAvatar">
                <div className="avatars-container">
                    <h2 className="h2Boutique">Avatars</h2>
                    <div className="avatars-grid">
                        {avatars.map((avatar, i) => (
                            <div key={i} className={`avatars ${unlockedAvatars.includes(avatar.name) ? '' : 'grise'}`} onClick={() => {setSelectedAvatar(avatar); setMessage("");}}>
                                <img src={avatar.image} alt={avatar.name} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Thèmes */}
            <div id="iconeThemes">
                <div className="themes-container">
                    <h2 className="h2Boutique">Thèmes</h2>
                    <div className="themes-grid">
                        {themes.map((theme, i) => (
                            <div key={i} className="theme" onClick={() => {setSelectedTheme(theme); setMessage(""); }}
                            >
                                <div className={`theme-box ${pulsePoints >= theme.cost ? '' : 'disabled'}`}>
                                    <p className="theme-name">{theme.name}</p>
                                    <p className="theme-description">{theme.description}</p>
                                    <p className="theme-cost">{theme.cost} PULSE points</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>

        {/* Popup Avatar */}
        {selectedAvatar && (
            <div className="popup-overlay">
                <div className="popup-box">
                    <h2>{selectedAvatar.description}</h2>
                    <img src={selectedAvatar.image} alt={selectedAvatar.description} />
                    <p>Coût : {selectedAvatar.cost} PULSE points</p>
                    {Array.isArray(selectedAvatar.objectives) && selectedAvatar.objectives.length > 0 && (
  <div className="objectives">
    <h4>Objectifs requis :</h4>
    <ul>{selectedAvatar.objectives.map((obj, i) => <li key={i}>{obj}</li>)}</ul>
  </div>
)}

                    <button className="purchase-btn" disabled={loading} onClick={handlePurchaseAvatar}>Acheter</button>
                    <button className="close-btn" onClick={() => {
  setSelectedAvatar(null);
  setMessage(""); // 👈 reset ici aussi
}}>
  Fermer
</button>
                    <p>{message}</p>
                </div>
            </div>
        )}

        {/* Popup Theme */}
        {selectedTheme && (
        <div className="popup-overlay">
            <div className="popup-box">
                <h2>{selectedTheme.name}</h2>
                <p>{selectedTheme.description}</p>
                <p>Coût : {selectedTheme.cost} PULSE points</p>

                {Array.isArray(selectedTheme.objectives) && selectedTheme.objectives.length > 0 && (
  <div className="objectives">
    <h4>Objectifs requis :</h4>
    <ul>{selectedTheme.objectives.map((obj, i) => <li key={i}>{obj}</li>)}</ul>
  </div>
)}


                <button className="purchase-btn" onClick={() => handlePreviewTheme(selectedTheme)}>
                    Essayer ce thème
                </button>

                {(unlockedThemes.includes(selectedTheme.name)) && (
                    <button className="purchase-btn" disabled={loading} onClick={handleApplyTheme}>
                        Choisir ce thème
                    </button>
                )}

                {!unlockedThemes.includes(selectedTheme.name) && (
                    <button className="purchase-btn" disabled={loading} onClick={handlePurchaseTheme}>
                        Acheter
                    </button>
                )}

<button className="close-btn" onClick={() => {
  setSelectedTheme(null);
  setPreviewTheme(null);
  setMessage(""); // 👈 reset ici aussi
}}>
  Fermer
</button>
                <p>{message}</p>
            </div>
        </div>
        )}

    </div>
    </div>
    </ThemeWrapper>
);
};

export default Boutique;
