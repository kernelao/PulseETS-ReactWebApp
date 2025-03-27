import React from "react";
import { useState } from "react";
import AVATAR from '/src/assets/image_avatar'

const Boutique = () => {
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const closePopupAvatar =()=>{
        setSelectedAvatar(null);
    }

    const [selectedTheme, setSelectedTheme] = useState(null);
    const closePopupTheme =()=>{
        setSelectedTheme(null);
    }

    const [pulsePoints, setPulsePoints] = useState(null);

    return(
        <div>
            <h1 className="h1Boutique">Boutique</h1>
            <div className='profile_image'>
                <img src="path_to_profile_picture.png" alt="Image de profil" className="profile-img" />
            </div>
            <div className="avatars">
                <h2 className="h2Profile">Avatars</h2>

            </div>
        </div>
    )
}

export default Boutique
