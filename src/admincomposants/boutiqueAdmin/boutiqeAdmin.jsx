import React, { useState, useEffect } from "react";
import AVATAR from '/src/assets/image_avatar';
import './BoutiqueAdmin.css';

const localAvatars = [
  { name: "Jon Doe", cost: 0, image: AVATAR.defaultavatar },
  { name: "Lina", cost: 100, image: AVATAR.avatarchandailrose },
  { name: "Grey Kid", cost: 100, image: AVATAR.avatarchapeaugris },
  { name: "Incognita", cost: 150, image: AVATAR.avatarchapeaushades },
  { name: "Julie", cost: 200, image: AVATAR.avatarcheveuxbleux },
  { name: "Roussette", cost: 150, image: AVATAR.avatarcheveuxroux },
  { name: "Wild n Serious", cost: 300, image: AVATAR.avatargreenblack },
  { name: "Sequelita", cost: 100, image: AVATAR.avatarhatmauve },
  { name: "80's boy", cost: 300, image: AVATAR.avatarlunettesfancy },
  { name: "Kim Possible", cost: 200, image: AVATAR.avatarroussepurplehat },
  { name: "Cool guy", cost: 250, image: AVATAR.avatarshades },
  { name: "Suit man", cost: 250, image: AVATAR.avatarsuits },
  { name: "I am Batman", cost: 2500, image: AVATAR.SPECIALbatman },
  { name: "Suuuuuu", cost: 2500, image: AVATAR.SPECIALcr7 },
  { name: "Elektra", cost: 2500, image: AVATAR.SPECIALfemalesuperhero },
  { name: "Tony Stark aka Ironman", cost: 2500, image: AVATAR.SPECIALironman },
  { name: "Why so serious?", cost: 2500, image: AVATAR.SPECIALjoker },
  { name: "Wild n serious on vacation", cost: 3000, image: AVATAR.VIPavatargreenblack },
  { name: "Donna", cost: 3000, image: AVATAR.VIPavatarshadescheveuxvert },
  { name: "Neon Lights", cost: 8000, image: AVATAR.ExclusiveNeon },
  { name: "Space Explorer", cost: 2000, image: AVATAR.ExclusiveSpaceExplorer },
  { name: "Steampunk Voyager", cost: 6000, image: AVATAR.ExclusiveSteampunk },
  { name: "Viking Warrior", cost: 5500, image: AVATAR.ExclusiveWarrior },
  { name: "Wizard Supreme", cost: 8000, image: AVATAR.ExclusiveWizard },
];

const localThemes = [
  { name: "Cyberpunk", description: "A futuristic neon vibe.", cost: 300 },
  { name: "Steampunk", description: "Old-world charm with a mechanical twist.", cost: 500 },
  { name: "Space", description: "Explore the galaxy.", cost: 700 },
  { name: "Dark Mode", description: "A minimalist dark theme.", cost: 200 },
  { name: "Neon Lights", description: "Bright, vibrant colors for a lively feel.", cost: 400 },
  { name: "Vintage", description: "Old school retro design.", cost: 350 },
  { name: "Minimalist", description: "Clean, simple, and modern.", cost: 250 },
];

const BoutiqueAdmin = () => {
  const [avatars, setAvatars] = useState([]);
  const [themes, setThemes] = useState([]);

  const handleToggleAvatar = (index) => {
    const updated = [...avatars];
    updated[index].active = !updated[index].active;
    updated[index]._modified = true;
    setAvatars(updated);
  };

  const handleToggleTheme = (index) => {
    const updated = [...themes];
    updated[index].active = !updated[index].active;
    updated[index]._modified = true;
    setThemes(updated);
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");
    const modifiedElements = [...avatars, ...themes].filter(e => e._modified);

    for (const element of modifiedElements) {
      try {
        await fetch(`http://localhost:8000/api/admin/elements/${element.id}/toggle`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (err) {
        console.error("Erreur de sauvegarde:", element.name);
      }
    }

    alert("Modifications enregistrées !");
  };

  useEffect(() => {
    const fetchElements = async () => {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:8000/api/admin/elements", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      const fetchedAvatars = data.filter(e => e.type === "avatar");
      const fetchedThemes = data.filter(e => e.type === "theme");

      const enrich = (fetched, local, isAvatar = true) =>
        fetched.map(e => {
          const localData = local.find(l => l.name === e.name || l.description === e.name);
          return {
            id: e.id,
            name: e.name,
            cost: localData?.cost || 0,
            description: localData?.description || "",
            image: isAvatar ? localData?.image : undefined,
            active: e.active,
            _modified: false,
          };
        });

      setAvatars(enrich(fetchedAvatars, localAvatars, true));
      setThemes(enrich(fetchedThemes, localThemes, false));
    };

    fetchElements();
  }, []);

  return (
    <div className="boutique-admin-container">
      <h1>Gestion de la Boutique</h1>

      <div className="avatars-admin-section">
        <h2>Avatars</h2>
        <div className="avatars-grid">
          {avatars.map((avatar, index) => (
            <div key={index} className="avatar-item">
              <img src={avatar.image} alt={avatar.name} className="avatar-img" />
              <div className="avatar-info">
                <p>{avatar.name}</p>
                <p>{avatar.cost} PULSE points</p>
                <div>
                  <label>Activer/Désactiver</label>
                  <input
                    type="checkbox"
                    checked={avatar.active}
                    onChange={() => handleToggleAvatar(index)}
                  />
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
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="save-bar">
        <button className="save-button" onClick={handleSaveChanges}>Enregistrer les modifications</button>
      </div>
    </div>
  );
};

export default BoutiqueAdmin;
