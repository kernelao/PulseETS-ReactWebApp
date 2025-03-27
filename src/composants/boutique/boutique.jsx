import React from "react";
import { useState } from "react";
import AVATAR from '/src/assets/image_avatar'
import './Boutique.css'

const Boutique = () => {
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const closePopupAvatar =()=>{
        setSelectedAvatar(null);
    }

    const [selectedTheme, setSelectedTheme] = useState(null);
    const closePopupTheme =()=>{
        setSelectedTheme(null);
    }

    const [pulsePoints, setPulsePoints] = useState(0);

    const avatars = [
            {image: AVATAR.defaultavatar, description: "Jon Doe"},
            {image: AVATAR.avatarchandailrose, description: "Lina"},
            {image: AVATAR.avatarchapeaugris, description: "Grey Kid"},
            {image: AVATAR.avatarchapeaushades, description: "Incognita"},
            {image: AVATAR.avatarcheveuxbleux, description: "Julie"},
            {image: AVATAR.avatarcheveuxroux, description: "Roussette"},
            {image: AVATAR.avatargreenblack, description: "Wild n Serious"},
            {image: AVATAR.avatarhatmauve, description: "Sequelita"},
            {image: AVATAR.avatarlunettesfancy, description: "80's boy"},
            {image: AVATAR.avatarroussepurplehat, description: "Kim Possible"},
            {image: AVATAR.avatarshades, description: "Cool guy"},
            {image: AVATAR.avatarsuits, description: "Suit man"},
            {image: AVATAR.SPECIALbatman, description: "I am Batman"},
            {image: AVATAR.SPECIALcr7, description: "Suuuuuu"},
            {image: AVATAR.SPECIALfemalesuperhero, description: "Elektra"},
            {image: AVATAR.SPECIALironman, description: "Tony Stark aka Ironman"},
            {image: AVATAR.SPECIALjoker, description: "Why so serious?"},
            {image: AVATAR.VIPavatargreenblack, description: "Wild n serious on vacation"},
            {image: AVATAR.VIPavatarshadescheveuxvert, description: "Donna"}
        ]

    const handleClick = (image, description) => {
            setSelectedAvatar ({image, description});
    }

    return(
        <div className="boutiqueContainer">
            <h1 className="h1Boutique">Boutique</h1>
            <div className='profile_image'>
                <img src="path_to_profile_picture.png" alt="Image de profil" className="profile-img" />
            </div>
            <div id="boutique">
                <div id="iconeAvatar">
                    <h2 className="h2Boutique">Avatars</h2>
                    {avatars.map((avatar, index) => (
                    <div key={index} className={`avatars ${avatar.condition ? '' : 'grise'}`} onClick={() =>
                        handleClick(avatar.image, avatar.description)}>
                        <img src={avatar.image} alt={avatar.description} />
                    </div>
                        ))}
                </div>

                {selectedAvatar && (
                    <div className="popup-overlay" onClick={closePopupAvatar}>
                        <div className="popup-box">
                            <img src={selectedAvatar.image} alt="Avatar sélectionné" />
                            <p>{selectedAvatar.description}</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Boutique
