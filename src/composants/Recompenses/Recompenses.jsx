import React, { useState } from 'react'
import IMAGES from '/src/assets/badges_recompenses'
import './Recompenses.css'

const Recompenses =({ recompenses = [] })=>{
    const [selectedBadge, setSelectedBadge] = useState(null);

    const closePopup =()=>{
        setSelectedBadge(null);
    }
    
    const handleClick = (badge, description, condition, type, requis) => {
            setSelectedBadge ({badge, description});
    }

    const debloquees = recompenses.map(r => r.type + '-' + r.valeur);

    const badges = [
        {image: IMAGES.i1noteAdd, description: "Une première note ajoutée!", condition: debloquees.includes('notesAjoutees-1'), type: 'notesAjoutees', requis: 1},
        {image: IMAGES.i5notesAdd, description: "Tu as 5 notes d'ajoutées!", condition: debloquees.includes('notesAjoutees-5'), type: 'notesAjoutees', requis: 5},
        {image: IMAGES.i15notesAdd, description: "15 notes d'ajoutées!", condition: debloquees.includes('notesAjoutees-15'), type: 'notesAjoutees', requis: 15},
        {image: IMAGES.i30notesAdd, description: "30 notes ajoutées!", condition: debloquees.includes('notesAjoutees-30'), type: 'notesAjoutees', requis: 30},
        {image: IMAGES.i100notesAdd, description: "100 notes ajoutées!", condition: debloquees.includes('notesAjoutees-100'), type: 'notesAjoutees', requis: 100},
        {image: IMAGES.i1sessionComplete, description: "Une première session complétée!", condition: debloquees.includes('sessionsCompletees-1'), type: 'sessionsCompletees', requis: 1},
        {image: IMAGES.i5sessionsComplete, description: "5 sessions complétées!", condition: debloquees.includes('sessionsCompletees-5'), type: 'sessionsCompletees', requis: 5},
        {image: IMAGES.i10sessionsComplete, description: "10 sessions complétées!", condition: debloquees.includes('sessionsCompletees-10'), type: 'sessionsCompletees', requis: 10},
        {image: IMAGES.i25sessionsComplete, description: "25 sessions complétées!", condition: debloquees.includes('sessionsCompletees-25'), type: 'sessionsCompletees', requis: 25},
        {image: IMAGES.i50sessionsComplete, description: "50 sessions complétées!", condition: debloquees.includes('sessionsCompletees-50'), type: 'sessionsCompletees', requis: 50},
        {image: IMAGES.i100sessionsComplete, description: "100 sessions complétées!", condition: debloquees.includes('sessionsCompletees-100'), type: 'sessionsCompletees', requis: 100},
        {image: IMAGES.i1tacheComplete, description: "Une première tâche complétée!", condition: debloquees.includes('tachesCompletees-1'), type: 'tachesCompletees', requis: 1},
        {image: IMAGES.i5tachesComplete, description: "5 tâches complétées!", condition: debloquees.includes('tachesCompletees-5'), type: 'tachesCompletees', requis: 5},
        {image: IMAGES.i20tachesComplete, description: "20 tâches complétées!", condition: debloquees.includes('tachesCompletees-20'), type: 'tachesCompletees', requis: 20},
        {image: IMAGES.i50tachesComplete, description: "50 tâches complétées!", condition: debloquees.includes('tachesCompletees-50'), type: 'tachesCompletees', requis: 50},
        {image: IMAGES.i100tachesComplete, description: "100 tâches complétées!", condition: debloquees.includes('tachesCompletees-100'), type: 'tachesCompletees', requis: 100},
    ]

    return (
        <div>
            <div id='iconeBadges'>
                {badges.map((badge, index) => (
                    <div
                        key={index}
                        className={`badges ${badge.condition ? '' : 'grise'}`}
                        onClick={() => handleClick(badge.image, badge.description)}
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