import React from 'react';
import '../../composants/Recompenses/Recompenses.css'; 

const RecompensePopup = ({ recompense, onClose }) => {
  if (!recompense) return null;

  const { image, description } = recompense;

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-box" onClick={(e) => e.stopPropagation()}>
        <img src={image} alt="Badge débloqué" />
        <p>{description}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default RecompensePopup;
