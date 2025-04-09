import React, { useState, useEffect } from "react";
import AVATAR from '/src/assets/image_avatar';
import './Boutique.css';
import axios from '../../api/Axios';

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


  const defaultAvatars = [
    { name: "Jon Doe", image: AVATAR.defaultavatar, description: "Jon Doe", cost: 0, objectives: [] },
    { name: "Lina", image: AVATAR.avatarchandailrose, description: "Lina", cost: 100, objectives: [] },
    { name: "Grey Kid", image: AVATAR.avatarchapeaugris, description: "Grey Kid", cost: 100, objectives: [] },
    { name: "Incognita", image: AVATAR.avatarchapeaushades, description: "Incognita", cost: 150, objectives: ["Atteindre 200 PULSE points"] },
    { name: "Julie", image: AVATAR.avatarcheveuxbleux, description: "Julie", cost: 200, objectives: [] },
    { name: "Roussette", image: AVATAR.avatarcheveuxroux, description: "Roussette", cost: 150, objectives: ["Compléter 10 tâches"] },
    { name: "Wild n Serious", image: AVATAR.avatargreenblack, description: "Wild n Serious", cost: 300, objectives: [] },
    { name: "Sequelita", image: AVATAR.avatarhatmauve, description: "Sequelita", cost: 100, objectives: [] },
    { name: "80s boy", image: AVATAR.avatarlunettesfancy, description: "80's boy", cost: 300, objectives: [] },
    { name: "Kim Possible", image: AVATAR.avatarroussepurplehat, description: "Kim Possible", cost: 200, objectives: [] },
    { name: "Cool guy", image: AVATAR.avatarshades, description: "Cool guy", cost: 250, objectives: [] },
    { name: "Suit man", image: AVATAR.avatarsuits, description: "Suit man", cost: 250, objectives: [] },
    { name: "I am Batman", image: AVATAR.SPECIALbatman, description: "I am Batman", cost: 2500, objectives: [] },
    { name: "Suuuuuu", image: AVATAR.SPECIALcr7, description: "Suuuuuu", cost: 2500, objectives: [] },
    { name: "Elektra", image: AVATAR.SPECIALfemalesuperhero, description: "Elektra", cost: 2500, objectives: [] },
    { name: "Tony Stark aka Ironman", image: AVATAR.SPECIALironman, description: "Tony Stark aka Ironman", cost: 2500, objectives: [] },
    { name: "Why so serious?", image: AVATAR.SPECIALjoker, description: "Why so serious?", cost: 2500, objectives: [] },
    { name: "Wild n serious on vacation", image: AVATAR.VIPavatargreenblack, description: "Wild n serious on vacation", cost: 3000, objectives: [] },
    { name: "Donna", image: AVATAR.VIPavatarshadescheveuxvert, description: "Donna", cost: 3000, objectives: [] },
    { name: "Neon Lights", image: AVATAR.ExclusiveNeon, description: "Neon Lights", cost: 8000, objectives: [] },
    { name: "Space Explorer", image: AVATAR.ExclusiveSpaceExplorer, description: "Space Explorer", cost: 2000, objectives: ["Compléter 50 tâches"] },
    { name: "Steampunk Voyager", image: AVATAR.ExclusiveSteampunk, description: "Steampunk Voyager", cost: 6000, objectives: [] },
    { name: "Viking Warrior", image: AVATAR.ExclusiveWarrior, description: "Viking Warrior", cost: 5500, objectives: [] },
    { name: "Wizard Supreme", image: AVATAR.ExclusiveWizard, description: "Wizard Supreme", cost: 8000, objectives: ["Compléter 100 sessions pomodoro"] },
  ];

  const defaultThemes = [
    { name: "Cyberpunk", description: "Futuriste et néon.", cost: 300, objectives: ["Compléter 10 tâches"] },
    { name: "Steampunk", description: "Old-world charm with a mechanical twist.", cost: 500, objectives: [] },
    { name: "Space", description: "Explore the galaxy.", cost: 700, objectives: ["Compléter 50 tâches"] },
    { name: "Dark Mode", description: "Thème sombre et sobre.", cost: 200, objectives: [] },
    { name: "Neon Lights", description: "Bright, vibrant colors for a lively feel.", cost: 400, objectives: [] },
    { name: "Vintage", description: "Old school retro design.", cost: 350, objectives: [] },
    { name: "Minimalist", description: "Design épuré et clair.", cost: 250, objectives: [] },
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
      const res = await axios.post(`/user/theme/apply`, {
        themeName: selectedTheme.name
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Erreur");
    }
  };

  return (
    <div className={`boutiqueContainer ${previewTheme ? 'theme-' + previewTheme : ''}`}>
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
                            <div key={i} className={`avatars ${unlockedAvatars.includes(avatar.name) ? '' : 'grise'}`} onClick={() => setSelectedAvatar(avatar)}>
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
                            <div key={i} className="theme" onClick={() => setSelectedTheme(theme)}>
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
                    {selectedAvatar.objectives.length > 0 && (
                        <div className="objectives">
                            <h4>Objectifs requis :</h4>
                            <ul>{selectedAvatar.objectives.map((obj, i) => <li key={i}>{obj}</li>)}</ul>
                        </div>
                    )}
                    <button className="purchase-btn" disabled={loading} onClick={handlePurchaseAvatar}>Acheter</button>
                    <button className="close-btn" onClick={() => setSelectedAvatar(null)}>Fermer</button>
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

                {selectedTheme.objectives.length > 0 && (
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

                <button className="close-btn" onClick={() => {setSelectedTheme(null); setPreviewTheme(null);}}>
                    Fermer
                </button>
                <p>{message}</p>
            </div>
        </div>
        )}

    </div>
);
};

export default Boutique;
