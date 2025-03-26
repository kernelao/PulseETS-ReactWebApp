import React, { useState } from 'react'
import IMAGES from '/src/assets/badges_recompenses'
import './Recompenses.css'

const Recompenses =()=>{
    const [selectedBadge, setSelectedBadge] = useState(null);

    const closePopup =()=>{
        setSelectedBadge(null);
    }
    
    const [progres, setProgres] = useState({
        notesAjoutees : 0,
        tachesCompletees : 0,
        sessionsCompletees : 0,
    })

    const suiviProgres = (type, requis) => {
        const progresCurrent = progres[type];
        if (progresCurrent >= requis) {
            return null;
        }
        const manquant = requis - progresCurrent;
        return `Il te manque encore ${manquant} ${type === 'notesAjoutees' ? 'note(s)' : type === 'tachesCompletees' ? 'tâche(s)' : 'session(s)'} pour débloquer ce badge.`;
    };

    const handleClick = (badge, description, condition, type, requis) => {
        if (condition) {
            setSelectedBadge ({badge, description});
        } else {
            const progresMessage = suiviProgres (type, requis);
            setSelectedBadge ({
                badge, description: progresMessage || description,
            })
            
        }
    }
    const badges = [
        {image: IMAGES.i1noteAdd, description: "Une première note ajoutée!", condition: progres.notesAjoutees >= 1, type: 'notesAjoutees', requis: 1},
        {image: IMAGES.i5notesAdd, description: "Tu as 5 notes d'ajoutées!", condition: progres.notesAjoutees >= 5, type: 'notesAjoutees', requis: 5},
        {image: IMAGES.i15notesAdd, description: "15 notes d'ajoutées!", condition: progres.notesAjoutees >= 15, type: 'notesAjoutees', requis: 15},
        {image: IMAGES.i30notesAdd, description: "30 notes ajoutées!", condition: progres.notesAjoutees >= 30, type: 'notesAjoutees', requis: 30},
        {image: IMAGES.i100notesAdd, description: "100 notes ajoutées!", condition: progres.notesAjoutees >= 100, type: 'notesAjoutees', requis: 100},
        {image: IMAGES.i1sessionComplete, description: "Une première session complétée!", condition: progres.sessionsCompletees >= 1, type: 'sessionsCompletees', requis: 1},
        {image: IMAGES.i5sessionsComplete, description: "5 sessions complétées!", condition: progres.sessionsCompletees >= 5, type: 'sessionsCompletees', requis: 5},
        {image: IMAGES.i10sessionsComplete, description: "10 sessions complétées!", condition: progres.sessionsCompletees >= 10, type: 'sessionsCompletees', requis: 10},
        {image: IMAGES.i25sessionsComplete, description: "25 sessions complétées!", condition: progres.sessionsCompletees >= 25, type: 'sessionsCompletees', requis: 25},
        {image: IMAGES.i50sessionsComplete, description: "50 sessions complétées!", condition: progres.sessionsCompletees >= 50, type: 'sessionsCompletees', requis: 50},
        {image: IMAGES.i100sessionsComplete, description: "100 sessions complétées!", condition: progres.sessionsCompletees >= 100, type: 'sessionsCompletees', requis: 100},
        {image: IMAGES.i1tacheComplete, description: "Une première tâche complétée!", condition: progres.tachesCompletees >= 1, type: 'tachesCompletees', requis: 1},
        {image: IMAGES.i5tachesComplete, description: "5 tâches complétées!", condition: progres.tachesCompletees >= 5, type: 'tachesCompletees', requis: 5},
        {image: IMAGES.i20tachesComplete, description: "20 tâches complétées!", condition: progres.tachesCompletees >= 20, type: 'tachesCompletees', requis: 20},
        {image: IMAGES.i50tachesComplete, description: "50 tâches complétées!", condition: progres.tachesCompletees >= 50, type: 'tachesCompletees', requis: 50},
        {image: IMAGES.i100tachesComplete, description: "100 tâches complétées!", condition: progres.tachesCompletees >= 100, type: 'tachesCompletees', requis: 100},
    ]

    return (
        <div>
            <div id='iconeBadges'>
                {badges.map((badge, index) => (
                    <div
                        key={index}
                        className={`badges ${badge.condition ? '' : 'grise'}`}
                        onClick={() =>
                            handleClick(badge.image, badge.description, badge.condition, badge.type, badge.requis)
                        }
                    >
                        <img src={badge.image} alt={badge.description} />
                    </div>
                ))}
            </div>

            {selectedBadge && (
                <div className="popup-overlay" onClick={() => setSelectedBadge(null)}>
                    <div className="popup-box">
                        <img src={selectedBadge.badge} alt="Badge sélectionné" />
                        <p>{selectedBadge.description}</p>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Recompenses