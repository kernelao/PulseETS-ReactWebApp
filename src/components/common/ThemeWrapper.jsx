import React, { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

const themeMap = {
  'Nuit': 'nuit',
  'Zen': 'zen',
  'Jour': 'jour',
  'Cyberpunk': 'cyberpunk',
  'Steampunk': 'steampunk',
  'Space': 'space',
  'Neon Lights': 'neon',
  'Vintage': 'vintage',
  'Minimalist': 'minimalist',
};

const ThemeWrapper = ({ children }) => {
  const { theme } = useContext(ThemeContext);
  const mappedTheme = themeMap[theme] || 'root';
  const appliedClass = `mode-${mappedTheme}`;

  return <div className={appliedClass}>{children}</div>;
};

export default ThemeWrapper;
