import React, { useContext } from 'react';
import { ThemeContext } from "../../context/ThemeContext";
import ThemeWrapper from '../../components/common/ThemeWrapper';



const Greeting = ({ username }) => {
  const hour = new Date().getHours();
  const { theme } = useContext(ThemeContext); 
  const themeClass = theme.toLowerCase().replace(' ', '-'); 

  const getGreeting = () => {
    if (hour < 12) return 'Bonjour';
    if (hour < 18) return 'Bon après-midi';
    return 'Bonsoir';
  };

  return (
    <ThemeWrapper>
    <div className={`greeting ${themeClass}`}>
      <h2>{getGreeting()}, {username} 👋</h2>
    </div>
    </ThemeWrapper>
  );
};

export default Greeting;