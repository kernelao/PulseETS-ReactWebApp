import React, { useState } from "react";
import AVATAR from '/src/assets/image_avatar';
import './BoutiqueAdmin.css';

const BoutiqueAdmin = () => {
    const [avatars, setAvatars] = useState([
        { image: AVATAR.defaultavatar, description: "Jon Doe", cost: 0, objectives: [], active: true },
        { image: AVATAR.avatarchandailrose, description: "Lina", cost: 100, objectives: [], active: true },
        { image: AVATAR.avatarchapeaugris, description: "Grey Kid", cost: 100, objectives: [], active: true },
        { image: AVATAR.avatarchapeaushades, description: "Incognita", cost: 150, objectives: ["Atteindre 200 PULSE points"], active: true },
        { image: AVATAR.avatarcheveuxbleux, description: "Julie", cost: 200, objectives: [], active: true },
        { image: AVATAR.avatarcheveuxroux, description: "Roussette", cost: 150, objectives: ["Compléter 10 tâches"], active: true },
        { image: AVATAR.avatargreenblack, description: "Wild n Serious", cost: 300, objectives: [], active: true },
        { image: AVATAR.avatarhatmauve, description: "Sequelita", cost: 100, objectives: [], active: true },
        { image: AVATAR.avatarlunettesfancy, description: "80's boy", cost: 300, objectives: [], active: true },
        { image: AVATAR.avatarroussepurplehat, description: "Kim Possible", cost: 200, objectives: [], active: true },
        { image: AVATAR.avatarshades, description: "Cool guy", cost: 250, objectives: [], active: true },
        { image: AVATAR.avatarsuits, description: "Suit man", cost: 250, objectives: [], active: true },
        { image: AVATAR.SPECIALbatman, description: "I am Batman", cost: 25000, objectives: [], active: true },
        { image: AVATAR.SPECIALcr7, description: "Suuuuuu", cost: 25000, objectives: [], active: true },
        { image: AVATAR.SPECIALfemalesuperhero, description: "Elektra", cost: 25000, objectives: [], active: true },
        { image: AVATAR.SPECIALironman, description: "Tony Stark aka Ironman", cost: 25000, objectives: [], active: true },
        { image: AVATAR.SPECIALjoker, description: "Why so serious?", cost: 25000, objectives: [], active: true },
        { image: AVATAR.VIPavatargreenblack, description: "Wild n serious on vacation", cost: 3000, objectives: [], active: true },
        { image: AVATAR.VIPavatarshadescheveuxvert, description: "Donna", cost: 3000, objectives: [], active: true },
        { image: AVATAR.avatarcyberpunk, description: "Cyber Punk", cost: 500, objectives: ["Compléter 20 tâches"], active: true },
        { image: AVATAR.avatarneonlights, description: "Neon Lights", cost: 400, objectives: [], active: true },
        { image: AVATAR.avatarspace, description: "Space Explorer", cost: 700, objectives: ["Compléter 50 tâches"], active: true },
        { image: AVATAR.avatarsteampunk, description: "Steampunk Voyager", cost: 600, objectives: [], active: true },
        { image: AVATAR.avatarviking, description: "Viking Warrior", cost: 750, objectives: [], active: true },
        { image: AVATAR.avatarwizard, description: "Wizard Supreme", cost: 1000, objectives: [], active: true },
    ]);

    const [themes, setThemes] = useState([
        { name: "Cyberpunk", description: "A futuristic neon vibe.", cost: 300, objectives: ["Compléter 10 tâches"], active: true },
        { name: "Steampunk", description: "Old-world charm with a mechanical twist.", cost: 500, objectives: [], active: true },
        { name: "Space", description: "Explore the galaxy.", cost: 700, objectives: ["Compléter 50 tâches"], active: true },
        { name: "Dark Mode", description: "A minimalist dark theme.", cost: 200, objectives: [], active: true },
        { name: "Neon Lights", description: "Bright, vibrant colors for a lively feel.", cost: 400, objectives: [], active: true },
        { name: "Vintage", description: "Old school retro design.", cost: 350, objectives: [], active: true },
        { name: "Minimalist", description: "Clean, simple, and modern.", cost: 250, objectives: [], active: true },
    ]);

    const handleToggleAvatar = (index) => {
        const updatedAvatars = [...avatars];
        updatedAvatars[index].active = !updatedAvatars[index].active;
        setAvatars(updatedAvatars);
    };

    const handleToggleTheme = (index) => {
        const updatedThemes = [...themes];
        updatedThemes[index].active = !updatedThemes[index].active;
        setThemes(updatedThemes);
    };

    return (
        <div className="boutique-admin-container">
            <h1>Gestion de la Boutique</h1>

            <div className="avatars-admin-section">
                <h2>Avatars</h2>
                <div className="avatars-grid">
                    {avatars.map((avatar, index) => (
                        <div key={index} className="avatar-item">
                            <img src={avatar.image} alt={avatar.description} className="avatar-img" />
                            <div className="avatar-info">
                                <p>{avatar.description}</p>
                                <p>{avatar.cost} PULSE points</p>
                                <div>
                                    <label>Activer/Désactiver</label>
                                    <input
                                        type="checkbox"
                                        checked={avatar.active}
                                        onChange={() => handleToggleAvatar(index)}
                                    />
                                </div>
                                <div>
                                    <p>Objectifs : </p>
                                    <ul>
                                        {avatar.objectives.map((objective, idx) => (
                                            <li key={idx}>{objective}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="themes-admin-section">
                <h2>Thèmes</h2>
                <div className="themes-grid">
                    {themes.map((theme, index) => (
                        <div key={index} className="theme-item">
                            <div className="theme-info">
                                <p>{theme.name}</p>
                                <p>{theme.cost} PULSE points</p>
                                <p>{theme.description}</p>
                                <div>
                                    <label>Activer/Désactiver</label>
                                    <input
                                        type="checkbox"
                                        checked={theme.active}
                                        onChange={() => handleToggleTheme(index)}
                                    />
                                </div>
                                <div>
                                    <p>Objectifs : </p>
                                    <ul>
                                        {theme.objectives.map((objective, idx) => (
                                            <li key={idx}>{objective}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BoutiqueAdmin;
