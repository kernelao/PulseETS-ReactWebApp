import React, { useState, useEffect } from 'react';
import Recompenses from '/src/composants/Recompenses/Recompenses.jsx';
import './Profile.css';
import api from "../../api/Axios";
import AVATAR from '/src/assets/image_avatar'

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [availableAvatars, setAvailableAvatars] = useState([]);
  const [pointsPulse, setPointsPulse] = useState(0); // Nouvelle variable pour les points Pulse
  const [recompenses, setRecompenses] = useState([]); // Nouvelle variable pour les récompenses
  const [oldPsw, setOldPsw] = useState("");
  const [newPsw, setNewPsw] = useState("");
  const [oldPswError, setOldPswError] = useState("");
  const [newPswError, setNewPswError] = useState("");
  const [isPasswordPopupOpen, setIsPasswordPopupOpen] = useState(false);

  const [oldEmail, setOldEmail] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [oldEmailError, setOldEmailError] = useState("");
  const [newEmailError, setNewEmailError] = useState("");
  const [isEmailPopupOpen, setIsEmailPopupOpen] = useState(false);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setOldPswError("");
    setNewPswError("");
  
    try {
      await api.post("/change-password", {
        oldPsw,
        newPsw
      });
      alert("Mot de passe modifié avec succès !");
      setIsPasswordPopupOpen(false);
      setOldPsw("");
      setNewPsw("");
    } catch (err) {
      const message = err.response?.data?.message || "Erreur lors de la modification du mot de passe";
      if (message.toLowerCase().includes("ancien")) {
        setOldPswError(message);
      } else {
        setNewPswError(message);
      }
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setOldEmailError("");
    setNewEmailError("");
  
    try {
      await api.post("/change-email", {
        oldEmail,
        newEmail
      });
      alert("Courriel modifié avec succès !");
      setIsEmailPopupOpen(false);
      setOldEmail("");
      setNewEmail("");
    } catch (err) {
      const message = err.response?.data?.message || "Erreur lors de la modification du courriel";
      if (message.toLowerCase().includes("ancien")) {
        setOldEmailError(message);
      } else {
        setNewEmailError(message);
      }
    }
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile");
        setUser(response.data);
        setSelectedAvatar(response.data.avatar ? response.data.avatar : AVATAR.defaultavatar);
  
        const avatarsPossedes = response.data.avatarsPossedes || []; // à adapter si tu veux aussi les avatars achetés
        const avatarsAvecDefaut = [{ id: "default", image: AVATAR.defaultavatar }, ...avatarsPossedes];
        setAvailableAvatars(avatarsAvecDefaut); 
  
        // Correction ici
        setPointsPulse(response.data.points); // 👈 correspond à la clé du backend
        setRecompenses(response.data.recompenses || []);
      } catch (err) {
        setError(err.response?.data?.message || "Erreur lors de la récupération du profil");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);
  

  const handleAvatarClick = () => {
    setIsAvatarPopupOpen(true);
  };

  const handleAvatarSelect = async (avatar) => {
    try {
      await api.post('/update-avatar', { avatarId: avatar.id });
      setSelectedAvatar(avatar.image || AVATAR.defaultavatar);
      setIsAvatarPopupOpen(false);
    } catch (error) {
      alert("Erreur lors de la mise à jour de l'avatar.");
    }
  };

  // Reste de ton code pour la gestion des mots de passe et des emails

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <div className="profile_container">
      <h1 className="h1Profile">Profile</h1>
      <div className="profile_image" onClick={handleAvatarClick}>
        <img src={selectedAvatar || AVATAR.defaultavatar} alt="Image de profil" className="profile-img" />
      </div>

      {isAvatarPopupOpen && (
        <div className="popup-overlay" onClick={() => setIsAvatarPopupOpen(false)}>
          <div className="popup-box" onClick={(e) => e.stopPropagation()}>
            <h3 className="h3Profile">Choisir un avatar</h3>
            <div className="avatars-container">
              {availableAvatars.map((avatar) => (
                <img
                  key={avatar.id}
                  src={avatar.image}
                  alt="Avatar"
                  className={`avatar-img ${selectedAvatar === avatar.image ? "selected" : ""}`}
                  onClick={() => handleAvatarSelect(avatar)}
                />
              ))}
            </div>
            <button className="btnProfile" onClick={() => window.location.href = '/app/boutique'}>
              Aller à la boutique
            </button>
          </div>
        </div>
      )}

      {/* Affichage des points Pulse */}
      <div className="points-pulse-container">
        <h2 className="h2Profile">Points Pulse</h2>
        <p>Points actuels : {pointsPulse}</p>
      </div>

      <div className="securite_container">
        <h2 className="h2Profile">Sécurité</h2>
        <div className="modifier_section">
          <button onClick={() => setIsPasswordPopupOpen(true)}>Modifier mot de passe</button>
        </div>
        <div className="modifier_section">
          <button className="btnProfile" onClick={() => setIsEmailPopupOpen(true)}>Modifier courriel</button>
        </div>

        {/* Popup pour modification mot de passe */}
        {isPasswordPopupOpen && (
          <div className="popup-overlay" onClick={() => setIsPasswordPopupOpen(false)}>
            <div className="popup-box" onClick={(e) => e.stopPropagation()}>
              <h3 className="h3Profile">Modifier mot de passe</h3>
              <form className="formProfile" onSubmit={handlePasswordSubmit}>
                <div>
                  <label>Ancien mot de passe</label>
                  <input
                    className="inputProfile"
                    type="password"
                    value={oldPsw}
                    onChange={(e) => setOldPsw(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  {oldPswError && <p style={{ color: "red" }}>{oldPswError}</p>}
                </div>
                <div>
                  <label>Nouveau mot de passe</label>
                  <input
                    className="inputProfile"
                    type="password"
                    value={newPsw}
                    onChange={(e) => setNewPsw(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                  {newPswError && <p style={{ color: "red" }}>{newPswError}</p>}
                </div>
                <button className="btnProfile" type="submit" disabled={loading}>Enregistrer</button>
              </form>
            </div>
          </div>
        )}

        {/* Popup pour modification email */}
        {isEmailPopupOpen && (
          <div className="popup-overlay" onClick={() => setIsEmailPopupOpen(false)}>
            <div className="popup-box" onClick={(e) => e.stopPropagation()}>
              <h3 className="h3Profile">Modifier courriel</h3>
              <form className="formProfile" onSubmit={handleEmailSubmit}>
                <div>
                  <label>Ancien courriel</label>
                  <input
                    className="inputProfile"
                    type="email"
                    value={oldEmail}
                    onChange={(e) => setOldEmail(e.target.value)}
                    placeholder="Ancien courriel"
                    required
                  />
                  {oldEmailError && <p style={{ color: "red" }}>{oldEmailError}</p>}
                </div>
                <div>
                  <label>Nouveau courriel</label>
                  <input
                    className="inputProfile"
                    type="email"
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="Nouveau courriel"
                    required
                  />
                  {newEmailError && <p style={{ color: "red" }}>{newEmailError}</p>}
                </div>
                <button className="btnProfile" type="submit" disabled={loading}>Enregistrer</button>
              </form>
            </div>
          </div>
        )}
      </div>

      <div className="recompenses_container">
        <h2 className="h2Profile">Récompenses</h2>
        <Recompenses recompenses={recompenses} /> {/* Passer les récompenses au composant */}
      </div>
    </div>
  );
}

export default Profile;
