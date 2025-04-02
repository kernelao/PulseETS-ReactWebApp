import React from "react";
import { useState } from "react";
import AVATAR from '/src/assets/image_avatar'
import './Boutique.css'

const Boutique = () => {
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [pulsePoints, setPulsePoints] = useState(100);
    const [unlockedAvatars, setUnlockedAvatars] = useState([AVATAR.defaultavatar]); 
    const [message, setMessage] = useState("");
    const closePopupAvatar =()=>{
        setSelectedAvatar(null);
    }

    const [selectedTheme, setSelectedTheme] = useState(null);
    const closePopupTheme =()=>{
        setSelectedTheme(null);
    }

    const avatars = [
            {image: AVATAR.defaultavatar, description: "Jon Doe", cost: 0},
            {image: AVATAR.avatarchandailrose, description: "Lina", cost: 100},
            {image: AVATAR.avatarchapeaugris, description: "Grey Kid", cost: 100},
            {image: AVATAR.avatarchapeaushades, description: "Incognita", cost: 150},
            {image: AVATAR.avatarcheveuxbleux, description: "Julie", cost: 200},
            {image: AVATAR.avatarcheveuxroux, description: "Roussette", cost: 150},
            {image: AVATAR.avatargreenblack, description: "Wild n Serious", cost: 300},
            {image: AVATAR.avatarhatmauve, description: "Sequelita", cost: 100},
            {image: AVATAR.avatarlunettesfancy, description: "80's boy", cost: 300},
            {image: AVATAR.avatarroussepurplehat, description: "Kim Possible", cost: 200},
            {image: AVATAR.avatarshades, description: "Cool guy", cost: 250},
            {image: AVATAR.avatarsuits, description: "Suit man", cost: 250},
            {image: AVATAR.SPECIALbatman, description: "I am Batman", cost: 25000},
            {image: AVATAR.SPECIALcr7, description: "Suuuuuu", cost: 25000},
            {image: AVATAR.SPECIALfemalesuperhero, description: "Elektra", cost: 25000},
            {image: AVATAR.SPECIALironman, description: "Tony Stark aka Ironman", cost: 25000},
            {image: AVATAR.SPECIALjoker, description: "Why so serious?", cost: 25000},
            {image: AVATAR.VIPavatargreenblack, description: "Wild n serious on vacation", cost: 3000},
            {image: AVATAR.VIPavatarshadescheveuxvert, description: "Donna", cost: 3000}
        ]

    const handleClick = (avatar) => {
        setSelectedAvatar(avatar);
        setMessage(""); // Réinitialiser le message à chaque ouverture du pop-up
    };

    const handlePurchase = () => {
        if (!selectedAvatar) return;

        if (unlockedAvatars.includes(selectedAvatar.image)) {
            setMessage("Cet avatar est déjà débloqué.");
        } else if (pulsePoints >= selectedAvatar.cost) {
            setPulsePoints(pulsePoints - selectedAvatar.cost);
            setUnlockedAvatars([...unlockedAvatars, selectedAvatar.image]);
            setMessage("Avatar débloqué avec succès !");
        } else {
            const manque = selectedAvatar.cost - pulsePoints;
            setMessage(`Il te manque encore ${manque} PULSE points pour débloquer cet avatar.`);
        }
    };

    return (
        <div className="boutiqueContainer">
            <h1 className="h1Boutique">Boutique</h1>
            <p className="points">Points PULSE : {pulsePoints}</p>
            
            <div className='profile_image' onClick={() => handleClick(avatar)}>
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
            </div>

            {selectedAvatar && (
                <div className="popup-overlay" onClick={() => setSelectedAvatar(null)}>
                    <div className="popup-box" onClick={(e) => e.stopPropagation()}>
                        <img src={selectedAvatar.image} alt="Avatar sélectionné" className="popup-avatar" />
                        <p className="popup-name">{selectedAvatar.description}</p>

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
        </div>
    );
}

export default Boutique
