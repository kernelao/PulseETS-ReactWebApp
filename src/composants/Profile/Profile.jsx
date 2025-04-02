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


  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile");
        setUser(response.data);
        setSelectedAvatar(response.data.avatar ? response.data.avatar : AVATAR.defaultavatar);
        const avatarsPossedes = response.data.avatarsPossedes || [];
        const avatarsAvecDefaut = [{ id: "default", image: AVATAR.defaultavatar }, ...avatarsPossedes];
        setAvailableAvatars(avatarsAvecDefaut);  // Assure-toi d'utiliser cette ligne
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


  const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).{8,24}$/;
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const [oldPsw, setOldPsw] = useState('');
  const [newPsw, setNewPsw] = useState('');
  const [oldEmail, setOldEmail] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [oldPswError, setOldPswError] = useState('');
  const [newPswError, setNewPswError] = useState('');
  const [oldEmailError, setOldEmailError] = useState('');
  const [newEmailError, setNewEmailError] = useState('');

  const [isPasswordPopupOpen, setIsPasswordPopupOpen] = useState(false);
  const [isEmailPopupOpen, setIsEmailPopupOpen] = useState(false);

  const validateInput = (value, regex, setError) => {
    if (value && !regex.test(value)) {
      setError("Format invalide");
    } else {
      setError("");
    }
  };

  useEffect(() => {
    validateInput(oldPsw, PWD_REGEX, setOldPswError);
    validateInput(newPsw, PWD_REGEX, setNewPswError);
    validateInput(oldEmail, EMAIL_REGEX, setOldEmailError);
    validateInput(newEmail, EMAIL_REGEX, setNewEmailError);
  }, [oldPsw, newPsw, oldEmail, newEmail]);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (oldPsw === newPsw) {
      alert("Le nouveau mot de passe ne peut pas être identique à l'ancien.");
      return;
    }
    setLoading(true);

    try {
      const response = await api.post('/change-password', { oldPsw, newPsw });
      alert("Mot de passe modifié avec succès");
    } catch (error) {
      alert(error.response?.status === 401 ? "L'ancien mot de passe est incorrect." : "Erreur lors de la modification du mot de passe.");
    } finally {
      setLoading(false);
      setIsPasswordPopupOpen(false);
    }
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    if (oldEmail === newEmail) {
      alert("Le nouveau courriel ne peut pas être identique à l'ancien.");
      return;
    }
    setLoading(true);

    try {
      const response = await api.post('/change-email', { oldEmail, newEmail });
      alert("Courriel modifié avec succès");
    } catch (error) {
      alert(error.response?.status === 401 ? "L'ancien courriel est incorrect." : "Erreur lors de la modification du courriel.");
    } finally {
      setLoading(false);
      setIsEmailPopupOpen(false);
    }
  };

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
        <Recompenses />
      </div>
    </div>
  );
}

export default Profile;
