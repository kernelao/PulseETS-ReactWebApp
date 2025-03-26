import React from 'react'
import Recompenses from '/src/components/layout/Recompenses/Recompenses.jsx'
import './Profile.css'
import { useState } from 'react'
import { useEffect } from 'react'

function Profile(){
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,24}$/;
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const [oldPsw, setOldPsw] = useState("");
    const [newPsw, setNewPsw] = useState("");
    const [oldEmail, setOldEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [oldPswError, setOldPswError] = useState("");
    const [newPswError, setNewPswError] = useState("");
    const [oldEmailError, setOldEmailError] = useState("");
    const [newEmailError, setNewEmailError] = useState("");

    const [isPasswordPopupOpen, setIsPasswordPopupOpen] = useState(false);
    const [isEmailPopupOpen, setIsEmailPopupOpen] = useState(false);

    useEffect(() => {
        if (oldPsw && !PWD_REGEX.test(oldPsw)) {
            setOldPswError("Mot de passe invalide (8-24 caractères, 1 maj, 1 min, 1 chiffre, 1 caractère spécial)");
        } else {
            setOldPswError("");
        }
    }, [oldPsw]);
    
    useEffect(() => {
        if (newPsw && !PWD_REGEX.test(newPsw)) {
            setNewPswError("Mot de passe invalide (8-24 caractères, 1 maj, 1 min, 1 chiffre, 1 caractère spécial)");
        } else {
            setNewPswError("");
        }
    }, [newPsw]);
    
    useEffect(() => {
        if (oldEmail && !EMAIL_REGEX.test(oldEmail)) {
            setOldEmailError("Format d'email invalide");
        } else {
            setOldEmailError("");
        }
    }, [oldEmail]);
    
    useEffect(() => {
        if (newEmail && !EMAIL_REGEX.test(newEmail)) {
            setNewEmailError("Format d'email invalide");
        } else {
            setNewEmailError("");
        }
    }, [newEmail]);
    
const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (oldPsw === newPsw) {
        alert("Le nouveau mot de passe ne peut pas être identique à l'ancien.");
        return;
    }
    if (!PWD_REGEX.test(newPsw)) {
        alert("Mot de passe invalide. Il doit contenir une majuscule, une minuscule, un chiffre et un caractère spécial.");
        return;
    }
    setIsPasswordPopupOpen(false);
};

const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (oldEmail === newEmail) {
        alert("Le nouveau courriel ne peut pas être identique à l'ancien.");
        return;
    }
    if (!EMAIL_REGEX.test(newPsw)) {
        alert("Courriel invalide.");
        return;
    }
    setIsEmailPopupOpen(false);
};

return(
    <div className='profile_container'>
        <h1>Profile</h1> <br />
            <div className='profile_image'>
                <img src="path_to_profile_picture.png" alt="Image de profil" className="profile-img" />
            </div>
        <div className='securite_container'>
            <div>
                <h2>Sécurité</h2>
                <div className='modifier_section'>
                    <button onClick={() => setIsPasswordPopupOpen(true)}>Modifier mot de passe</button>
                </div>
                <div className='modifier_section'>
                    <button onClick={() => setIsEmailPopupOpen(true)}>Modifier courriel</button>
                </div>
            </div>

            {/* modif mdp */}
            {isPasswordPopupOpen && (
                <div className="popup-overlay" onClick={() => setIsPasswordPopupOpen(false)}>
                    <div className="popup-box" onClick={(e) => e.stopPropagation()}>
                        <h3>Modifier mot de passe</h3>
                        <form onSubmit={handlePasswordSubmit}>
                            <div>
                                <label>Ancien mot de passe</label>
                                <input
                                    type="password"
                                    value={oldPsw}
                                    onChange={(e) => setOldPsw(e.target.value)}
                                    placeholder="••••••••"
                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,24}$"
                                    required
                                />
                                {oldPswError && <p style={{ color: "red" }}>{oldPswError}</p>}
                            </div>
                            <div>
                                <label>Nouveau mot de passe</label>
                                <input
                                    type="password"
                                    value={newPsw}
                                    onChange={(e) => setNewPsw(e.target.value)}
                                    placeholder="••••••••"
                                    pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,24}$"
                                    required
                                />
                                {newPswError && <p style={{ color: "red" }}>{newPswError}</p>}
                            </div>
                            <button type="submit">Enregistrer</button>
                        </form>
                    </div>
                </div>
            )}

            {/* modif email */}
            {isEmailPopupOpen && (
                <div className="popup-overlay" onClick={() => setIsEmailPopupOpen(false)}>
                    <div className="popup-box" onClick={(e) => e.stopPropagation()}>
                        <h3>Modifier courriel</h3>
                        <form onSubmit={handleEmailSubmit}>
                            <div>
                                <label>Ancien courriel</label>
                                <input
                                    type="email"
                                    value={oldEmail}
                                    onChange={(e) => setOldEmail(e.target.value)}
                                    placeholder="Ancien courriel"
                                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                                    required
                                />
                                {oldEmailError && <p style={{ color: "red" }}>{oldEmailError}</p>}
                            </div>
                            <div>
                                <label>Nouveau courriel</label>
                                <input
                                    type="email"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    placeholder="Nouveau courriel"
                                    pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                                    required
                                />
                                {newEmailError && <p style={{ color: "red" }}>{newEmailError}</p>}
                            </div>
                            <button type="submit">Enregistrer</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
        <div className='recompenses_container'>
            <div>
                <h2>Récompenses</h2>
            </div>
            <Recompenses/>
            <div>

            </div>
        </div>
    </div>
);
}

export default Profile;