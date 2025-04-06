import React, { useState } from "react";
import AVATAR from '/src/assets/image_avatar';
import './Boutique.css';

const Boutique = () => {
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [pulsePoints, setPulsePoints] = useState(100);
    const [unlockedAvatars, setUnlockedAvatars] = useState([AVATAR.defaultavatar]);
    const [unlockedThemes, setUnlockedThemes] = useState([]);
    const [message, setMessage] = useState("");
    const [completedObjectives, setCompletedObjectives] = useState({});

    const closePopupAvatar = () => {
        setSelectedAvatar(null);
    };

    const closePopupTheme = () => {
        setSelectedTheme(null);
    };

    const [selectedTheme, setSelectedTheme] = useState(null);

    // Les avatars et thèmes avec des objectifs supplémentaires
    const avatars = [
        { image: AVATAR.defaultavatar, description: "Jon Doe", cost: 0, objectives: [] },
        { image: AVATAR.avatarchandailrose, description: "Lina", cost: 100, objectives: [] },
        { image: AVATAR.avatarchapeaugris, description: "Grey Kid", cost: 100, objectives: [] },
        { image: AVATAR.avatarchapeaushades, description: "Incognita", cost: 150, objectives: ["Atteindre 200 PULSE points"] },
        { image: AVATAR.avatarcheveuxbleux, description: "Julie", cost: 200, objectives: [] },
        { image: AVATAR.avatarcheveuxroux, description: "Roussette", cost: 150, objectives: ["Compléter 10 tâches"] },
        { image: AVATAR.avatargreenblack, description: "Wild n Serious", cost: 300, objectives: [] },
        { image: AVATAR.avatarhatmauve, description: "Sequelita", cost: 100, objectives: [] },
        { image: AVATAR.avatarlunettesfancy, description: "80's boy", cost: 300, objectives: [] },
        { image: AVATAR.avatarroussepurplehat, description: "Kim Possible", cost: 200, objectives: [] },
        { image: AVATAR.avatarshades, description: "Cool guy", cost: 250, objectives: [] },
        { image: AVATAR.avatarsuits, description: "Suit man", cost: 250, objectives: [] },
        { image: AVATAR.SPECIALbatman, description: "I am Batman", cost: 25000, objectives: [] },
        { image: AVATAR.SPECIALcr7, description: "Suuuuuu", cost: 25000, objectives: [] },
        { image: AVATAR.SPECIALfemalesuperhero, description: "Elektra", cost: 25000, objectives: [] },
        { image: AVATAR.SPECIALironman, description: "Tony Stark aka Ironman", cost: 25000, objectives: [] },
        { image: AVATAR.SPECIALjoker, description: "Why so serious?", cost: 25000, objectives: [] },
        { image: AVATAR.VIPavatargreenblack, description: "Wild n serious on vacation", cost: 3000, objectives: [] },
        { image: AVATAR.VIPavatarshadescheveuxvert, description: "Donna", cost: 3000, objectives: [] },
        { image: AVATAR.avatarcyberpunk, description: "Cyber Punk", cost: 500, objectives: ["Compléter 20 tâches"] },
        { image: AVATAR.avatarneonlights, description: "Neon Lights", cost: 400, objectives: [] },
        { image: AVATAR.avatarspace, description: "Space Explorer", cost: 700, objectives: ["Compléter 50 tâches"] },
        { image: AVATAR.avatarsteampunk, description: "Steampunk Voyager", cost: 600, objectives: [] },
        { image: AVATAR.avatarviking, description: "Viking Warrior", cost: 750, objectives: [] },
        { image: AVATAR.avatarwizard, description: "Wizard Supreme", cost: 1000, objectives: [] },
    ];

    const themes = [
        { name: "Cyberpunk", description: "A futuristic neon vibe.", cost: 300, objectives: ["Compléter 10 tâches"] },
        { name: "Steampunk", description: "Old-world charm with a mechanical twist.", cost: 500, objectives: [] },
        { name: "Space", description: "Explore the galaxy.", cost: 700, objectives: ["Compléter 50 tâches"] },
        { name: "Dark Mode", description: "A minimalist dark theme.", cost: 200, objectives: [] },
        { name: "Neon Lights", description: "Bright, vibrant colors for a lively feel.", cost: 400, objectives: [] },
        { name: "Vintage", description: "Old school retro design.", cost: 350, objectives: [] },
        { name: "Minimalist", description: "Clean, simple, and modern.", cost: 250, objectives: [] },
    ];

    const handleClick = (avatar) => {
        setSelectedAvatar(avatar);
        setMessage(""); // Réinitialiser le message à chaque ouverture du pop-up
    };

    const handlePurchase = () => {
        if (!selectedAvatar) return;

        // Vérifier si l'utilisateur a rempli les objectifs
        const objectivesCompleted = selectedAvatar.objectives.every((objective) => completedObjectives[objective]);
        if (unlockedAvatars.includes(selectedAvatar.image)) {
            setMessage("Cet avatar est déjà débloqué.");
        } else if (pulsePoints >= selectedAvatar.cost && objectivesCompleted) {
            setPulsePoints(pulsePoints - selectedAvatar.cost);
            setUnlockedAvatars([...unlockedAvatars, selectedAvatar.image]);
            setMessage("Avatar débloqué avec succès !");
        } else {
            const manque = selectedAvatar.cost - pulsePoints;
            setMessage(`Il te manque encore ${manque} PULSE points ou tu n'as pas rempli les objectifs.`);
        }
    };

    const handleThemeClick = (theme) => {
        setSelectedTheme(theme);
        setMessage(""); // Réinitialiser le message à chaque ouverture du pop-up
    };

    const handleThemePurchase = () => {
        if (!selectedTheme) return;

        // Vérifier si l'utilisateur a rempli les objectifs
        const objectivesCompleted = selectedTheme.objectives.every((objective) => completedObjectives[objective]);
        if (pulsePoints >= selectedTheme.cost && objectivesCompleted) {
            setPulsePoints(pulsePoints - selectedTheme.cost);
            setUnlockedThemes([...unlockedThemes, selectedTheme.name]);
            setMessage(`Thème "${selectedTheme.name}" activé avec succès !`);
        } else {
            const manque = selectedTheme.cost - pulsePoints;
            setMessage(`Il te manque encore ${manque} PULSE points ou tu n'as pas rempli les objectifs.`);
        }
    };

    const handleCompleteObjective = (objective) => {
        setCompletedObjectives({ ...completedObjectives, [objective]: true });
    };

    return (
        <div className="boutiqueContainer">
            <h1 className="h1Boutique">Boutique</h1>
            <p className="points">Points PULSE : {pulsePoints}</p>

            <div className='profile_image' onClick={() => handleClick(avatars[0])}>
                <img src={selectedAvatar?.image || AVATAR.defaultavatar} alt="Image de profil" className="profile-img" />
            </div>

            <div id="boutique">
                <div id="iconeAvatar">
                    <div className="avatars-container">
                        <h2 className="h2Boutique">Avatars</h2>
                        <div className="avatars-grid">
                            {avatars.map((avatar, index) => (
                                <div
                                    key={index}
                                    className={`avatars ${unlockedAvatars.includes(avatar.image) ? '' : 'grise'}`}
                                    onClick={() => handleClick(avatar)}
                                >
                                    <img src={avatar.image} alt={avatar.description} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div id="iconeThemes">
                    <div className="themes-container">
                        <h2 className="h2Boutique">Thèmes</h2>
                        <div className="themes-grid">
                            {themes.map((theme, index) => (
                                <div key={index} className="theme" onClick={() => handleThemeClick(theme)}>
                                    <div className={`theme-box ${pulsePoints >= theme.cost && theme.objectives.every((objective) => completedObjectives[objective]) ? '' : 'disabled'}`}>
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

            {selectedAvatar && (
                <div className="popup-overlay" onClick={() => setSelectedAvatar(null)}>
                    <div className="popup-box" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedAvatar.image} alt="Avatar sélectionné" className="popup-avatar" />
                        <p className="popup-name">{selectedAvatar.description}</p>

                        {selectedAvatar.objectives.length > 0 && (
                            <div>
                                <p>Objectifs à remplir :</p>
                                <ul>
                                    {selectedAvatar.objectives.map((objective, index) => (
                                        <li key={index} onClick={() => handleCompleteObjective(objective)}>
                                            {objective} {completedObjectives[objective] ? "(Complété)" : ""}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {!unlockedAvatars.includes(selectedAvatar.image) && (
                            <>
                                <p className="popup-cost">{selectedAvatar.cost} PULSE points</p>
                                <button className="purchase-btn" onClick={handlePurchase}>
                                    Acheter
                                </button>
                            </>
                        )}

                        {message && <p className="popup-message">{message}</p>}

                        <button className="close-btn" onClick={() => setSelectedAvatar(null)}>Fermer</button>
                    </div>
                </div>
            )}

            {selectedTheme && (
                <div className="popup-overlay" onClick={() => setSelectedTheme(null)}>
                    <div className="popup-box" onClick={(e) => e.stopPropagation()}>
                        <p className="popup-name">{selectedTheme.name}</p>
                        <p className="popup-description">{selectedTheme.description}</p>
                        <p className="popup-cost">{selectedTheme.cost} PULSE points</p>

                        {selectedTheme.objectives.length > 0 && (
                            <div>
                                <p>Objectifs à remplir :</p>
                                <ul>
                                    {selectedTheme.objectives.map((objective, index) => (
                                        <li key={index} onClick={() => handleCompleteObjective(objective)}>
                                            {objective} {completedObjectives[objective] ? "(Complété)" : ""}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        <button className="purchase-btn" onClick={handleThemePurchase}>
                            Activer
                        </button>

                        {message && <p className="popup-message">{message}</p>}

                        <button className="close-btn" onClick={() => setSelectedTheme(null)}>Fermer</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Boutique;
