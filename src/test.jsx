import React, { useState } from 'react';

const TestPopup = () => {
    const [selectedBadge, setSelectedBadge] = useState(null);

    const handleClick = () => {
        setSelectedBadge({ badge: 'badge_url', description: 'Description de badge' });
    };

    const closePopup = () => {
        setSelectedBadge(null);
    };

    return (
        <div>
            <button onClick={handleClick}>Cliquer pour afficher la pop-up</button>

            {selectedBadge && (
                <div className="popup-overlay" onClick={closePopup}>
                    <div className="popup-box">
                        <img src={selectedBadge.badge} alt="Badge sélectionné" />
                        <p>{selectedBadge.description}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TestPopup;
