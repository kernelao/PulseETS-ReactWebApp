import React, { useState, useEffect, useContext } from 'react';
import Recompenses from '/src/composants/Recompenses/Recompenses.jsx';
import './Profile.css';
import api from "../../api/Axios";
import AVATAR, { avatarMap } from '/src/assets/image_avatar';
import ThemeWrapper from "../../components/common/ThemeWrapper";
import { ThemeContext } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [isAvatarPopupOpen, setIsAvatarPopupOpen] = useState(false);
  const [availableAvatars, setAvailableAvatars] = useState([]);
  const [avatarImage, setAvatarImage] = useState(AVATAR.defaultavatar);
  const [pointsPulse, setPointsPulse] = useState(0);
  const [recompenses, setRecompenses] = useState([]);
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

  const { theme } = useContext(ThemeContext);
  const { setUserData } = useUser();
  const themeClass = theme.toLowerCase().replace(' ', '-');

  // 🔁 Fetch user profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await api.get("/profile");
        const data = response.data;

        setUser(data);
        setUserData(prev => ({
          ...prev,
          avatarPrincipal: data.avatarPrincipal,
          themeName: data.themeName,
          pulsePoints: data.pulsePoints,
        }));

        const avatarKeyFromData = avatarMap[data.avatarPrincipal || "Jon Doe"];
        const avatar = AVATAR[avatarKeyFromData] || AVATAR.defaultavatar;
        setAvatarImage(avatar);
        setSelectedAvatar(avatar);

        const avatarsAvecImages = (data.unlockedAvatars || []).map(nom => {
          const key = avatarMap[nom];
          return {
            id: nom,
            name: nom,
            image: AVATAR[key] || AVATAR.defaultavatar,
          };
        });

        const avatarsAvecDefaut = [
          { id: "defaultavatar", name: "Jon Doe", image: AVATAR.defaultavatar },
          ...avatarsAvecImages
        ];

        const seen = new Set();
        const avatarsUniques = avatarsAvecDefaut.filter(avatar => {
          if (seen.has(avatar.name)) return false;
          seen.add(avatar.name);
          return true;
        });

        setAvailableAvatars(avatarsUniques);
        setPointsPulse(data.pulsePoints || 0);
        setRecompenses(data.recompenses || []);
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
      setSelectedAvatar(avatar.image || AVATAR.defaultavatar);
      setAvatarImage(avatar.image || AVATAR.defaultavatar);

      await api.put('/user/avatar/principal', { avatarName: avatar.name });

      const response = await api.get("/profile");
      const avatarKey = avatarMap[response.data.avatarPrincipal || "Jon Doe"];

      setAvatarImage(AVATAR[avatarKey] || AVATAR.defaultavatar);
      setSelectedAvatar(AVATAR[avatarKey] || AVATAR.defaultavatar);

      setUserData(prev => ({
        ...prev,
        avatarPrincipal: response.data.avatarPrincipal
      }));

      setIsAvatarPopupOpen(false);
    } catch (error) {
      alert("Erreur lors de la mise à jour de l'avatar.");
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setOldPswError("");
    setNewPswError("");

    try {
      await api.post("/user/change-password", { oldPsw, newPsw });
      alert("Mot de passe modifié avec succès !");
      localStorage.removeItem("token");
      window.location.href = "/connexion";
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
      await api.post("/user/change-email", { oldEmail, newEmail });
      alert("Courriel modifié avec succès !");
      localStorage.removeItem("token");
      window.location.href = "/connexion";
    } catch (err) {
      const message = err.response?.data?.message || "Erreur lors de la modification du courriel";
      if (message.toLowerCase().includes("ancien")) {
        setOldEmailError(message);
      } else {
        setNewEmailError(message);
      }
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error}</p>;

  return (
    <ThemeWrapper>
      <div className={`profile_wrapper theme-${themeClass}`}>
        <div className={`profile_container mode-${themeClass}`}>
          <h1 className="h1Profile">Profil</h1>
          <div className="profile_image">
            <img src={avatarImage} onClick={handleAvatarClick} alt="Image de profil" className="profile-img" />
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

          <div className="points-pulse-container">
            <h2 className="h2Profile">Points Pulse</h2>
            <p className="rectProfile">Points actuels : {pointsPulse}</p>
          </div>

          <div className="securite_container">
            <h2 className="h2Profile">Sécurité</h2>
            <div className="modifier_section">
              <button className="btnProfile" onClick={() => setIsPasswordPopupOpen(true)}>Modifier mot de passe</button>
              <button className="btnProfile" onClick={() => setIsEmailPopupOpen(true)}>Modifier courriel</button>
            </div>

            {isPasswordPopupOpen && (
              <div className="popup-overlay" onClick={() => setIsPasswordPopupOpen(false)}>
                <div className="popup-box" onClick={(e) => e.stopPropagation()}>
                  <h3 className="h3Profile">Modifier mot de passe</h3>
                  <form className="formProfile" onSubmit={handlePasswordSubmit}>
                    <label>Ancien mot de passe</label>
                    <input className="inputProfile" type="password" value={oldPsw} onChange={(e) => setOldPsw(e.target.value)} required />
                    {oldPswError && <p style={{ color: "red" }}>{oldPswError}</p>}
                    <label>Nouveau mot de passe</label>
                    <input className="inputProfile" type="password" value={newPsw} onChange={(e) => setNewPsw(e.target.value)} required />
                    {newPswError && <p style={{ color: "red" }}>{newPswError}</p>}
                    <button className="btnProfile" type="submit">Enregistrer</button>
                  </form>
                </div>
              </div>
            )}

            {isEmailPopupOpen && (
              <div className="popup-overlay" onClick={() => setIsEmailPopupOpen(false)}>
                <div className="popup-box" onClick={(e) => e.stopPropagation()}>
                  <h3 className="h3Profile">Modifier courriel</h3>
                  <form className="formProfile" onSubmit={handleEmailSubmit}>
                    <label>Ancien courriel</label>
                    <input className="inputProfile" type="email" value={oldEmail} onChange={(e) => setOldEmail(e.target.value)} required />
                    {oldEmailError && <p style={{ color: "red" }}>{oldEmailError}</p>}
                    <label>Nouveau courriel</label>
                    <input className="inputProfile" type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} required />
                    {newEmailError && <p style={{ color: "red" }}>{newEmailError}</p>}
                    <button className="btnProfile" type="submit">Enregistrer</button>
                  </form>
                </div>
              </div>
            )}
          </div>

          <div className="recompenses_container">
            <h2 className="h2Profile">Récompenses</h2>
            <Recompenses recompenses={recompenses} />
          </div>
        </div>
      </div>
    </ThemeWrapper>
  );
}

export default Profile;
