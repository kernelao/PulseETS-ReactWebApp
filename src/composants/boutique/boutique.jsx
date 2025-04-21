import React, { useState, useEffect, useContext } from "react";
import AVATAR, { avatarMap } from '/src/assets/image_avatar';
import './Boutique.css';
import axios from '../../api/Axios';
import { ThemeContext } from "../../context/ThemeContext";
import { useUser } from "../../context/UserContext";
import ThemeWrapper from "../../components/common/ThemeWrapper";



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
  const { userData, setUserData } = useUser();
  const avatarKey = avatarMap[userData.avatarPrincipal || "defautavatar"];
  const avatarImage = AVATAR[avatarKey] || AVATAR.defaultavatar;
  const themeClass = theme.toLowerCase().replace(' ', '-');

  const defaultThemes = [
    { name: "Cyberpunk", description: "Futuriste et néon.", cost: 300 },
    { name: "Steampunk", description: "Old-world charm.", cost: 500 },
    { name: "Space", description: "Explore the galaxy.", cost: 700 },
    { name: "Dark Mode", description: "Thème sombre et sobre.", cost: 200 },
    { name: "Neon Lights", description: "Couleurs vives.", cost: 400 },
    { name: "Vintage", description: "Style rétro.", cost: 350 },
    { name: "Minimalist", description: "Design épuré.", cost: 250 },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [avatarsRes, themesRes, profileRes] = await Promise.all([
          axios.get('/boutique/avatars'),
          axios.get('/boutique/themes'),
          axios.get('/boutique/profile')
        ]);
  
        const unlockedAvatars = profileRes.data.unlockedAvatars || [];
        const unlockedThemes = profileRes.data.unlockedThemes || [];
        const pulsePoints = profileRes.data.pulsePoints || 0;
  
        const enrichedAvatars = avatarsRes.data
          .filter(api => defaultAvatars.find(local => local.name === api.name))
          .map(api => {
            const local = defaultAvatars.find(l => l.name === api.name);
            return {
              ...local,
              id: api.id,
              owned: unlockedAvatars.includes(api.name)
            };
          });
  
        const enrichedThemes = themesRes.data
          .filter(api => defaultThemes.find(local => local.name === api.name))
          .map(api => {
            const local = defaultThemes.find(l => l.name === api.name);
            return {
              ...local,
              id: api.id,
              owned: unlockedThemes.includes(api.name)
            };
          });
  
        setAvatars(enrichedAvatars);
        setThemes(enrichedThemes);
        setUnlockedAvatars(unlockedAvatars);
        setUnlockedThemes(unlockedThemes);
        setPulsePoints(pulsePoints);
      } catch (error) {
        console.error("Erreur de chargement de la boutique :", error);
      }
    };
  
    fetchData();
  }, []);  

  const handleApplyAvatar = async () => {
    if (!selectedAvatar) return;
    try {
      const res = await axios.put(`/user/avatar/principal`, {
        avatarName: selectedAvatar.name
      });
      setMessage(res.data.message);
      setUserData(prev => ({ ...prev, avatarPrincipal: selectedAvatar.name }));
    } catch (err) {
      setMessage(err.response?.data?.message || "Erreur lors de l'application.");
    }
  };

  const handlePreviewTheme = (theme) => {
    setPreviewTheme(theme.name);
    changeTheme(theme.name);
  };

  const handleApplyTheme = async () => {
    if (!selectedTheme) return;
  
    setSelectedTheme(null);
    setPreviewTheme(null);
  
    setLoading(true);
    try {
      const res = await axios.post(`/user/theme/apply`, {
        themeName: selectedTheme.name,
      });
      setMessage(res.data.message);
  
      changeTheme(selectedTheme.name);
  
      setUserData(prev => ({ ...prev, themeName: selectedTheme.name }));
    } catch (err) {
      setMessage(err.response?.data?.message || "Erreur lors de l'application.");
    } finally {
      setLoading(false);
    }
  };
  

  const handlePurchaseAvatar = async () => {
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

  return (
    <ThemeWrapper>
      <div className={`boutiqueContainer mode-${themeClass}`} style={{ minHeight: '100vh' }}>
        <h1 className="h1Boutique">Boutique</h1>
        <p className="points">Points PULSE : {pulsePoints}</p>
        <div className="profile_image">
          <img src={avatarImage} alt="Profil" className="profile-img" />
        </div>

        <div className="boutique-content">
          <div id="iconeAvatar" className="sectionContainer">
            <h2 className="h2Boutique">Avatars</h2>
            <div className="avatars-grid">
              {avatars.map((avatar, i) => (
                <div key={i} className={`avatars ${unlockedAvatars.includes(avatar.name) ? '' : 'grise'}`} onClick={() => { setSelectedAvatar(avatar); setMessage(""); }}>
                  <img src={avatar.image} alt={avatar.name} />
                </div>
              ))}
            </div>
          </div>

          <div id="iconeThemes" className="sectionContainer">
            <h2 className="h2Boutique">Thèmes</h2>
            <div className="themes-grid">
              {themes.map((theme, i) => (
                <div key={i} className={`theme`} onClick={() => { setSelectedTheme(theme); setMessage(""); }}>
                  <div className={`theme-box ${pulsePoints >= theme.cost ? '' : 'disabled'} ${unlockedThemes.includes(theme.name) ? '' : 'grise'}`}>
                    <p className="theme-name">{theme.name}</p>
                    <p className="theme-description">{theme.description}</p>
                    <p className="theme-cost">{theme.cost} PULSE points</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {selectedAvatar && (
          <div className="popup-overlay">
            <div className="popup-box">
              <h2>{selectedAvatar.description}</h2>
              <img src={selectedAvatar.image} alt={selectedAvatar.description} />
              <p>Coût : {selectedAvatar.cost} PULSE points</p>
              {unlockedAvatars.includes(selectedAvatar.name) ? (
                <button className="purchase-btn" onClick={handleApplyAvatar}>Utiliser cet avatar</button>
              ) : (
                <button className="purchase-btn" onClick={handlePurchaseAvatar}>Acheter</button>
              )}
              <button className="close-btn" onClick={() => { setSelectedAvatar(null); setMessage(""); }}>Fermer</button>
              <p>{message}</p>
            </div>
          </div>
        )}

        {selectedTheme && (
          <div className="popup-overlay">
            <div className="popup-box">
              <h2>{selectedTheme.name}</h2>
              <p>{selectedTheme.description}</p>
              <p>Coût : {selectedTheme.cost} PULSE points</p>
              <button className="purchase-btn" onClick={() => handlePreviewTheme(selectedTheme)}>Essayer ce thème</button>
              {unlockedThemes.includes(selectedTheme.name) ? (
                <button className="purchase-btn" onClick={handleApplyTheme}>Choisir ce thème</button>
              ) : (
                <button className="purchase-btn" onClick={handlePurchaseTheme}>Acheter</button>
              )}
              <button className="close-btn" onClick={() => {
                setSelectedTheme(null);
                setPreviewTheme(null);
                changeTheme(userData.themeName || 'Mode zen');
                setMessage("");
              }}>Fermer</button>
              <p>{message}</p>
            </div>
          </div>
        )}
      </div>
    </ThemeWrapper>
  );
};

export default Boutique;

const defaultAvatars = [
  { name: "defautavatar", image: AVATAR.defaultavatar, description: "Jon Doe", cost: 0 },
  { name: "Lina", image: AVATAR.avatarchandailrose, description: "Lina", cost: 100 },
  { name: "Grey Kid", image: AVATAR.avatarchapeaugris, description: "Grey Kid", cost: 100 },
  { name: "Incognita", image: AVATAR.avatarchapeaushades, description: "Incognita", cost: 150 },
  { name: "Julie", image: AVATAR.avatarcheveuxbleux, description: "Julie", cost: 200 },
  { name: "Roussette", image: AVATAR.avatarcheveuxroux, description: "Roussette", cost: 150 },
  { name: "Wild n Serious", image: AVATAR.avatargreenblack, description: "Wild n Serious", cost: 300 },
  { name: "Sequelita", image: AVATAR.avatarhatmauve, description: "Sequelita", cost: 100 },
  { name: "80s boy", image: AVATAR.avatarlunettesfancy, description: "80s boy", cost: 300 },
  { name: "Kim Possible", image: AVATAR.avatarroussepurplehat, description: "Kim Possible", cost: 200 },
  { name: "Cool guy", image: AVATAR.avatarshades, description: "Cool guy", cost: 250 },
  { name: "Suit man", image: AVATAR.avatarsuits, description: "Suit man", cost: 250 },
  { name: "I am Batman", image: AVATAR.SPECIALbatman, description: "I am Batman", cost: 2500 },
  { name: "Suuuuuu", image: AVATAR.SPECIALcr7, description: "Suuuuuu", cost: 2500 },
  { name: "Elektra", image: AVATAR.SPECIALfemalesuperhero, description: "Elektra", cost: 2500 },
  { name: "Tony Stark aka Ironman", image: AVATAR.SPECIALironman, description: "Tony Stark aka Ironman", cost: 2500 },
  { name: "Why so serious?", image: AVATAR.SPECIALjoker, description: "Why so serious?", cost: 2500 },
  { name: "Wild n serious on vacation", image: AVATAR.VIPavatargreenblack, description: "Wild n serious on vacation", cost: 3000 },
  { name: "Donna", image: AVATAR.VIPavatarshadescheveuxvert, description: "Donna", cost: 3000 },
  { name: "Neon Lights", image: AVATAR.ExclusiveNeon, description: "Neon Lights", cost: 8000 },
  { name: "Space Explorer", image: AVATAR.ExclusiveSpaceExplorer, description: "Space Explorer", cost: 2000 },
  { name: "Steampunk Voyager", image: AVATAR.ExclusiveSteampunk, description: "Steampunk Voyager", cost: 6000 },
  { name: "Viking Warrior", image: AVATAR.ExclusiveWarrior, description: "Viking Warrior", cost: 5500 },
  { name: "Wizard Supreme", image: AVATAR.ExclusiveWizard, description: "Wizard Supreme", cost: 8000 },
];
