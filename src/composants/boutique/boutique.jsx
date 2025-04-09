import React, { useState, useEffect } from "react";
import AVATAR from '/src/assets/image_avatar';
import './Boutique.css';
import axios from './../../api/Axios'

const Boutique = () => {
    const [avatars, setAvatars] = useState([]);
    const [themes, setThemes] = useState([]);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [pulsePoints, setPulsePoints] = useState(500);
    const [unlockedAvatars, setUnlockedAvatars] = useState([]);
    const [unlockedThemes, setUnlockedThemes] = useState([]);
    const [message, setMessage] = useState("");
    const [completedObjectives, setCompletedObjectives] = useState({});
    const [loading, setLoading] = useState(false);
    const [previewTheme, setPreviewTheme] = useState(null);
    const [appliedTheme, setAppliedTheme] = useState(null);


    useEffect(() => {    
        const localAvatars = [
            { name: "Jon Doe", image: AVATAR.defaultavatar, description: "Jon Doe", cost: 0, objectives: [] },
            { name: "Lina", image: AVATAR.avatarchandailrose, description: "Lina", cost: 100, objectives: [] },
            { name: "Grey Kid", image: AVATAR.avatarchapeaugris, description: "Grey Kid", cost: 100, objectives: [] },
            { name: "Incognita", image: AVATAR.avatarchapeaushades, description: "Incognita", cost: 150, objectives: ["Atteindre 200 PULSE points"] },
            { name: "Julie", image: AVATAR.avatarcheveuxbleux, description: "Julie", cost: 200, objectives: [] },
            { name: "Roussette", image: AVATAR.avatarcheveuxroux, description: "Roussette", cost: 150, objectives: ["Compléter 10 tâches"] },
            { name: "Wild n Serious", image: AVATAR.avatargreenblack, description: "Wild n Serious", cost: 300, objectives: [] },
            { name: "Sequelita", image: AVATAR.avatarhatmauve, description: "Sequelita", cost: 100, objectives: [] },
            { name: "80's boy", image: AVATAR.avatarlunettesfancy, description: "80's boy", cost: 300, objectives: [] },
            { name: "Kim Possible", image: AVATAR.avatarroussepurplehat, description: "Kim Possible", cost: 200, objectives: [] },
            { name: "Cool guy", image: AVATAR.avatarshades, description: "Cool guy", cost: 250, objectives: [] },
            { name: "Suit man", image: AVATAR.avatarsuits, description: "Suit man", cost: 250, objectives: [] },
            { name: "I am Batman", image: AVATAR.SPECIALbatman, description: "I am Batman", cost: 25000, objectives: [] },
            { name: "Suuuuuu", image: AVATAR.SPECIALcr7, description: "Suuuuuu", cost: 25000, objectives: [] },
            { name: "Elektra", image: AVATAR.SPECIALfemalesuperhero, description: "Elektra", cost: 25000, objectives: [] },
            { name: "Tony Stark aka Ironman", image: AVATAR.SPECIALironman, description: "Tony Stark aka Ironman", cost: 25000, objectives: [] },
            { name: "Why so serious?", image: AVATAR.SPECIALjoker, description: "Why so serious?", cost: 25000, objectives: [] },
            { name: "Wild n serious on vacation", image: AVATAR.VIPavatargreenblack, description: "Wild n serious on vacation", cost: 3000, objectives: [] },
            { name: "Donna", image: AVATAR.VIPavatarshadescheveuxvert, description: "Donna", cost: 3000, objectives: [] },
            { name: "Neon Lights", image: AVATAR.ExclusiveNeon, description: "Neon Lights", cost: 400, objectives: [] },
            { name: "Space Explorer", image: AVATAR.ExclusiveSpaceExplorer, description: "Space Explorer", cost: 700, objectives: ["Compléter 50 tâches"] },
            { name: "Steampunk Voyager", image: AVATAR.ExclusiveSteampunk, description: "Steampunk Voyager", cost: 600, objectives: [] },
            { name: "Viking Warrior", image: AVATAR.ExclusiveWarrior, description: "Viking Warrior", cost: 750, objectives: [] },
            { name: "Wizard Supreme", image: AVATAR.ExclusiveWizard, description: "Wizard Supreme", cost: 1000, objectives: [] },
        ];
    
        const localThemes = [
            { name: "Cyberpunk", description: "A futuristic neon vibe.", cost: 300, objectives: ["Compléter 10 tâches"] },
            { name: "Steampunk", description: "Old-world charm with a mechanical twist.", cost: 500, objectives: [] },
            { name: "Space", description: "Explore the galaxy.", cost: 700, objectives: ["Compléter 50 tâches"] },
            { name: "Dark Mode", description: "A minimalist dark theme.", cost: 200, objectives: [] },
            { name: "Neon Lights", description: "Bright, vibrant colors for a lively feel.", cost: 400, objectives: [] },
            { name: "Vintage", description: "Old school retro design.", cost: 350, objectives: [] },
            { name: "Minimalist", description: "Clean, simple, and modern.", cost: 250, objectives: [] },
        ];
        
        axios.get('/boutique/avatars')
            .then(response => {
                const data = response.data;
                if (!Array.isArray(data)) {
                    console.error("Réponse avatars invalide:", data);
                    return;
                }
                const enriched = data.map(backendAvatar => {
                    const match = localAvatars.find(a => a.name === backendAvatar.name);
                    return {
                        ...backendAvatar,
                        image: match?.image || AVATAR.defaultavatar,
                        description: match?.description || backendAvatar.name,
                        cost: match?.cost || 0,
                        objectives: match?.objectives || [],
                    };
                });
                setAvatars(enriched);
            })
            .catch(err => {
                console.error("Erreur avatars:", err);
            });

        axios.get('/boutique/themes')
            .then(response => {
                const data = response.data;
                if (!Array.isArray(data)) {
                    console.error("Réponse thèmes invalide:", data);
                    return;
                }
                const enriched = data.map(backendTheme => {
                    const match = localThemes.find(t => t.name === backendTheme.name);
                    return {
                        ...backendTheme,
                        description: match?.description || backendTheme.name,
                        cost: match?.cost || 0,
                        objectives: match?.objectives || [],
                    };
                });
                setThemes(enriched);
            })
            .catch(err => {
                console.error("Erreur thèmes:", err);
            });

        axios.get('/boutique/profile')
            .then(response => {
                const data = response.data;
                setPulsePoints(data.pulsePoints);
                setUnlockedAvatars(data.unlockedAvatars);
                setUnlockedThemes(data.unlockedThemes);
            })
            .catch(err => {
                console.error("Erreur profile:", err);
            });
    }, []);
    
    const handlePreviewTheme = (theme) => {
        document.body.className = `theme-${theme.name.toLowerCase().replace(/\s/g, '-')}`;
    };
    

    const handlePurchaseAvatar = async () => {
        if (!selectedAvatar || loading) return;
        setLoading(true);
        try {
            const response = await fetch(`/api/user/avatars/${selectedAvatar.id}/buy`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include' });
            const data = await response.json();
            setMessage(data.message);
            if (response.ok) {
                setPulsePoints(prev => prev - selectedAvatar.cost);
                setUnlockedAvatars([...unlockedAvatars, selectedAvatar.name]);
                setSelectedAvatar(null);
            }
        } catch (error) {
            setMessage("Erreur lors de l'achat.");
        } finally {
            setLoading(false);
        }
    };

    const handlePurchaseTheme = async () => {
        if (!selectedTheme || loading) return;
        setLoading(true);
        try {
            const response = await fetch(`/api/user/themes/${selectedTheme.id}/buy`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include' });
            const data = await response.json();
            setMessage(data.message);
            if (response.ok) {
                setPulsePoints(prev => prev - selectedTheme.cost);
                setUnlockedThemes([...unlockedThemes, selectedTheme.name]);
                setSelectedTheme(null);
            }
        } catch (error) {
            setMessage("Erreur lors de l'achat.");
        } finally {
            setLoading(false);
        }
    };

    const handleThemeClick = (theme) => {
        setSelectedTheme(theme);
        setMessage("");
        document.body.className = `theme-${theme.name.toLowerCase().replace(/\s/g, '-')}`;
    };

    const handleApplyTheme = async () => {
        if (!selectedTheme) return;
    
        try {
            const response = await fetch(`/api/user/theme/apply/${selectedTheme.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
            });
    
            const data = await response.json();
            setMessage(data.message);
    
            if (response.ok) {
                setAppliedTheme(selectedTheme.name);
                closePopupTheme();
            }
        } catch (error) {
            console.error("Erreur lors de l'application du thème :", error);
            setMessage("Une erreur est survenue.");
        }
    };
    

    return (
        <div className={`boutiqueContainer ${previewTheme ? 'theme-' + previewTheme : ''}`}>
            <h1 className="h1Boutique">Boutique</h1>
            <p className="points">Points PULSE : {pulsePoints}</p>
            <div className="profile_image">
                <img src={selectedAvatar?.image || 'src/assets/image_avatar/defaultavatar.svg'} alt="Avatar" />
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

            <button className="close-btn" onClick={() => setSelectedTheme(null)}>Fermer</button>
            <p>{message}</p>
        </div>
    </div>
)}

        </div>
    );
};

export default Boutique;
