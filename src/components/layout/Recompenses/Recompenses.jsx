import React from 'react'
import IMAGES from '/src/assets/badges_recompenses'

const Recompenses =()=>{
    return (
        <div>
            <h2>Test</h2>
            <img src={IMAGES.i1noteAdd} className='badges' alt="1 note ajoutée!" />
            <img src={IMAGES.i1sessionComplete} className='badges' alt="1 session complétée!" />
            <img src={IMAGES.i1tacheComplete} className='badges' alt="1 tâche complétée!" />
            <img src={IMAGES.i5notesAdd} className='badges' alt="5 notes ajoutées!" />
            <img src={IMAGES.i5sessionsComplete} className='badges' alt="5 sessions complétées!" />
            <img src={IMAGES.i5tachesComplete} className='badges' alt="1 note ajoutée!" />
            <img src={IMAGES.i10sessionsComplete} className='badges' alt="10 sessions complétées!" />
            <img src={IMAGES.i15notesAdd} className='badges' alt="15 notes ajoutées!" />
            <img src={IMAGES.i20tachesComplete} className='badges' alt="1 note ajoutée!" />
            <img src={IMAGES.i25sessionsComplete} className='badges' alt="25 sessions complétées!" />
            <img src={IMAGES.i30notesAdd} className='badges' alt="30 notes ajoutées!" />
            <img src={IMAGES.i50sessionsComplete} className='badges' alt="50 sessions complétées!" />
            <img src={IMAGES.i50tachesComplete} className='badges' alt="1 note ajoutée!" />
            <img src={IMAGES.i100notesAdd} className='badges' alt="100 notes ajoutées!" />
            <img src={IMAGES.i100sessionsComplete} className='badges' alt="100 sessions complétées!" />
            <img src={IMAGES.i100tachesComplete} className='badges' alt="1 note ajoutée!" />
        </div>
    )
}

export default Recompenses