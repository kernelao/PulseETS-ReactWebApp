// src/theme/theme.jsx
import React, { useContext } from 'react';
import { ThemeContext } from "../../context/ThemeContext";
import "../../components/common/theme.css";


const ThemeWrapper = ({ children }) => {
  const { theme } = useContext(ThemeContext);

  const appliedClass = theme.startsWith("Mode ")
    ? theme.toLowerCase().replace(/\s/g, '-')
    : `theme-${theme.toLowerCase().replace(/\s/g, '-')}`;

  return <div className={appliedClass}>{children}</div>;
};

export default ThemeWrapper;
