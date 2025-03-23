import React, { useState } from 'react'
import IMAGES from '/src/assets/badges_recompenses'
import './Recompenses.css'

const Recompenses =()=>{
    const [selectedBadge, setSelectedBadge] = useState(null);

    const handleClick = (badge, description) => {
        setSelectedBadge ({badge, description});
    }

    const closePopup =()=>{
        setSelectedBadge(null);
    }

    return (
        <div>
            <div id='iconeBadges'>
                <div className='badges' onClick={() => handleClick(IMAGES.i1noteAdd, "Une première note ajoutée")}>
                <img src={IMAGES.i1noteAdd}  alt="1 note ajoutée" />
                </div>
                <div className='badges' onClick={() => handleClick(IMAGES.i1sessionComplete, "Une pemière session complétée")}>
                <img src={IMAGES.i1sessionComplete} alt="1 session complétée" />
                </div>
                <div className='badges' onClick={() => handleClick(IMAGES.i1tacheComplete, "Une première tâches complétée")}>
                <img src={IMAGES.i1tacheComplete} alt="1 tâche complétée" />
                </div>
                <div className='badges' onClick={() => handleClick(IMAGES.i5notesAdd, "5 notes ajoutées")}>
                <img src={IMAGES.i5notesAdd} alt="5 notes ajoutées" />
                </div>
                <div className='badges' onClick={() => handleClick(IMAGES.i5sessionsComplete, "5 sessions complétées")}>
                <img src={IMAGES.i5sessionsComplete} alt="5 sessions complétées" />
                </div>
                <div className='badges' onClick={() => handleClick(IMAGES.i5tachesComplete, "5 tâches complétées")}>
                <img src={IMAGES.i5tachesComplete} alt="5 tâches complétées" />
                </div>
                <div className='badges' onClick={() => handleClick(IMAGES.i10sessionsComplete, "10 sessions complétées")}>
                <img src={IMAGES.i10sessionsComplete} alt="10 sessions complétées" />
                </div>
                <div className='badges' onClick={() => handleClick(IMAGES.i15notesAdd, "15 notes ajoutées")}>
                <img src={IMAGES.i15notesAdd} alt="15 notes ajoutées" />
                </div>
                <div className='badges' onClick={() => handleClick(IMAGES.i20tachesComplete, "20 tâches complétées")}>
                <img src={IMAGES.i20tachesComplete} alt="20 tâches complétées" />
                </div>
                <div className='badges' onClick={() => handleClick(IMAGES.i25sessionsComplete, "25 sessions complétées")}>
                <img src={IMAGES.i25sessionsComplete} alt="25 sessions complétées" />
                </div>
                <div className='badges' onClick={() => handleClick(IMAGES.i30notesAdd, "30 notes ajoutées")}>
                <img src={IMAGES.i30notesAdd} alt="30 notes ajoutées" />
                </div>
                <div className='badges' onClick={() => handleClick(IMAGES.i50sessionsComplete, "50 sessions complétées")}>
                <img src={IMAGES.i50sessionsComplete} alt="50 sessions complétées" />
                </div>
                <div className='badges' onClick={() => handleClick(IMAGES.i50tachesComplete, "50 tâches complétées")}>
                <img src={IMAGES.i50tachesComplete} alt="50 tâches complétées" />
                </div>
                <div className='badges' onClick={() => handleClick(IMAGES.i100notesAdd, "100 notes ajoutées")}>
                <img src={IMAGES.i100notesAdd} alt="100 notes ajoutées" />
                </div>
                <div className='badges' onClick={() => handleClick(IMAGES.i100sessionsComplete, "100 sessions complétées")}>
                <img src={IMAGES.i100sessionsComplete} alt="100 sessions complétées" />
                </div>
                <div className='badges' onClick={() => handleClick(IMAGES.i100tachesComplete, "100 tâches complétées")}>
                <img src={IMAGES.i100tachesComplete} alt="100 tâches complétées" />
                </div>     
            </div>

            {selectedBadge && (
                <div className="popup-overlay" onClick={closePopup}>
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