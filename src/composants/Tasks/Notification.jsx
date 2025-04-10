// ✅ Notification.jsx

import React, { useEffect } from "react";
import "./Notification.css";

const Notification = ({ message, onClose, type }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    if (!message) return null;

    return (
        <div className="notification-popup">
            {message}
        </div>
    );
};

export default Notification;
