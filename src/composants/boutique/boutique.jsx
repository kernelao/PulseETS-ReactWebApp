import React, { useState, useEffect} from "react";
import AVATAR from '/src/assets/image_avatar';
import './Boutique.css';

const Boutique = () => {
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [selectedTheme, setSelectedTheme] = useState(null);
    const [pulsePoints, setPulsePoints] = useState(500);
    const [unlockedAvatars, setUnlockedAvatars] = useState([AVATAR.defaultavatar]);
    const [unlockedThemes, setUnlockedThemes] = useState([]);
    const [message, setMessage] = useState("");
    const [completedObjectives, setCompletedObjectives] = useState({});

    useEffect(() => {
        // Charger les avatars et thèmes depuis l'API
        fetch('/api/boutique/avatars')
            .then(response => response.json())
            .then(data => setAvatars(data))
            .catch(error => console.error('Erreur lors de la récupération des avatars', error));

        fetch('/api/boutique/themes')
            .then(response => response.json())
            .then(data => setThemes(data))
            .catch(error => console.error('Erreur lors de la récupération des thèmes', error));

        fetch('/api/boutique/profile')
            .then(response => response.json())
            .then(data => {
                setPulsePoints(data.pulsePoints);
                setUnlockedAvatars(data.unlockedAvatars);
                setUnlockedThemes(data.unlockedThemes);
            })
            .catch(error => console.error('Erreur lors de la récupération du profil', error));
    }, []);

    const closePopupAvatar = () => {
        setSelectedAvatar(null);
    };

    const closePopupTheme = () => {
        setSelectedTheme(null);
    };

    const handleClick = (avatar) => {
        setSelectedAvatar(avatar);
        setMessage(""); // Réinitialiser le message à chaque ouverture du pop-up
    };

    const handlePurchaseAvatar = () => {
        if (!selectedAvatar) return;
    
        // Vérifier si l'utilisateur a rempli les objectifs
        const objectivesCompleted = selectedAvatar.objectives.every((objective) => completedObjectives[objective]);
        if (unlockedAvatars.includes(selectedAvatar.image)) {
            setMessage("Cet avatar est déjà débloqué.");
        } else if (pulsePoints >= selectedAvatar.cost && objectivesCompleted) {
            setPulsePoints(pulsePoints - selectedAvatar.cost);
            setUnlockedAvatars([...unlockedAvatars, selectedAvatar.image]);
            setMessage("Avatar débloqué avec succès !");
    
            // Envoyer l'achat au backend
            fetch(`/api/user/avatars/${selectedAvatar.id}/buy`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    avatarId: selectedAvatar.id,
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === "Avatar acheté avec tes points PULSE") {
                    setMessage("L'achat a été effectué et enregistré avec succès !");
                } else {
                    setMessage("Une erreur s'est produite lors de l'achat.");
                }
            })
            .catch(error => {
                console.error('Erreur lors de l\'achat de l\'avatar', error);
                setMessage("Erreur lors de l'achat de l'avatar.");
            });
        } else {
            const manque = selectedAvatar.cost - pulsePoints;
            setMessage(`Il te manque encore ${manque} PULSE points ou tu n'as pas rempli les objectifs.`);
        }
    };    

    const handleThemeClick = (theme) => {
        setSelectedTheme(theme);
        setMessage(""); // Réinitialiser le message à chaque ouverture du pop-up
    };

    const handlePurchaseTheme = () => {
        if (!selectedTheme) return;
    
        // Vérifier si l'utilisateur a rempli les objectifs
        const objectivesCompleted = selectedTheme.objectives.every((objective) => completedObjectives[objective]);
        if (pulsePoints >= selectedTheme.cost && objectivesCompleted) {
            setPulsePoints(pulsePoints - selectedTheme.cost);
            setUnlockedThemes([...unlockedThemes, selectedTheme.name]);
            setMessage(`Thème "${selectedTheme.name}" activé avec succès !`);
    
            // Envoyer l'achat au backend
            fetch(`/api/user/themes/${selectedTheme.id}/buy`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    themeId: selectedTheme.id,
                }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.message === "Thème acheté avec tes points PULSE") {
                    setMessage("Le thème a été activé et enregistré avec succès !");
                } else {
                    setMessage("Une erreur s'est produite lors de l'achat du thème.");
                }
            })
            .catch(error => {
                console.error('Erreur lors de l\'achat du thème', error);
                setMessage("Erreur lors de l'achat du thème.");
            });
        } else {
            const manque = selectedTheme.cost - pulsePoints;
            setMessage(`Il te manque encore ${manque} PULSE points ou tu n'as pas rempli les objectifs.`);
        }
    };
    

    const handleCompleteObjective = (objective) => {
        setCompletedObjectives({ ...completedObjectives, [objective]: true });
    };

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
        { image: AVATAR.ExclusiveNeon, description: "Neon Lights", cost: 400, objectives: [] },
        { image: AVATAR.ExclusiveSpaceExplorer, description: "Space Explorer", cost: 700, objectives: ["Compléter 50 tâches"] },
        { image: AVATAR.ExclusiveSteampunk, description: "Steampunk Voyager", cost: 600, objectives: [] },
        { image: AVATAR.ExclusiveWarrior, description: "Viking Warrior", cost: 750, objectives: [] },
        { image: AVATAR.ExclusiveWizard, description: "Wizard Supreme", cost: 1000, objectives: [] },
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

    return (
        <div className="boutiqueContainer">
            <h1 className="h1Boutique">Boutique</h1>
            <p className="points">Points PULSE : {pulsePoints}</p>

            <div className="profile_image">
                <img src={selectedAvatar?.image || 'src/assets/image_avatar/defaultavatar.svg'} alt="Avatar" />
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
                                    <img src={avatar.image} alt={avatar.name} />
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

            {selectedAvatar && (
                <div className="popup-overlay">
                    <div className="popup-box">
                        <h2>{selectedAvatar.description}</h2>
                        <p>Coût : {selectedAvatar.cost} PULSE points</p>
                        <button className="purchase-btn" onClick={handlePurchaseAvatar}>Acheter</button>
                        <button className="close-btn" onClick={closePopupAvatar}>Fermer</button>
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
                        <button className="purchase-btn" onClick={handlePurchaseTheme}>Activer</button>
                        <button className="close-btn" onClick={closePopupTheme}>Fermer</button>
                        <p>{message}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Boutique;
