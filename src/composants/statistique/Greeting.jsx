import React from 'react';

const Greeting = ({ username }) => {
  const hour = new Date().getHours();
  const getGreeting = () => {
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  return (
    <div className="greeting">
      <h2>{getGreeting()}, {username} 👋</h2>
    </div>
  );
};

export default Greeting;