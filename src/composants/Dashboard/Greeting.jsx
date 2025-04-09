import React from 'react';

const Greeting = ({ username }) => {
  const hour = new Date().getHours();
  const getGreeting = () => {
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="greeting">
      <h2>{getGreeting()}, {username} 👋</h2>
    </div>
  );
};

export default Greeting;