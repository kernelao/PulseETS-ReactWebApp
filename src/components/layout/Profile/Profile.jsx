import React from 'react'
import Recompenses from '/src/components/layout/Recompenses/Recompenses.jsx'
import './Profile.css'
import { useState } from 'react'

function Profile(){
    const [oldPsw, setOldPsw] = useState("");
    const [newPsw, setNewPsw] = useState("");
    const [oldEmail, setOldEmail] = useState("");
    const [newEmail, setNewEmail] = useState("");

const handleSubmit = (e) => {
    e.preventDefault();
};

return(
    <div className='profile_container'>
        <h1>Profile</h1> <br />
        <div className='securite_container'>
            <div>
                <h2>Sécurité</h2>
            </div>
            <form onSubmit={handleSubmit}>
                <div>
                    <h4>Nouveau mot de passe</h4>
                </div>
                <div>
                <input className='boite_formulaire'
                type="password"
                value={newPsw}
                onChange={(e) => setNewPsw (e.target.value)}
                placeholder='••••••••'
                />          
                </div>   
                <div>
                    <h4>Ancien mot de passe</h4>
                </div>   
                <div>
                <input className='boite_formulaire'
                type="password"
                value={oldPsw}
                onChange={(e) => setOldPsw (e.target.value)}
                placeholder='••••••••'
                />
                </div>
                <div>
                <button type="submit">Enregistrer le nouveau mot de passe</button>
                </div>
                <div>
                    <h4>Nouveau courriel</h4>
                </div>
                <div>
                <input className='boite_formulaire'
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail (e.target.value)}
                placeholder='Nouveau courriel'
                />
                </div>
                <div>
                    <h4>Ancien courriel</h4>
                </div>
                <div>
                <input className='boite_formulaire'
                type="email"
                value={oldEmail}
                onChange={(e) => setOldEmail (e.target.value)}
                placeholder='Ancien courriel'
                />
                </div>
                <div>
                <button type="submit">Enregistrer le nouveau courriel</button>
                </div>
            </form>
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