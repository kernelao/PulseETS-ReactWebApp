import React, { useContext } from 'react';
import './TimerPom.css';
import CircleTimer from './CircleTimer.jsx';
import QuickPanneau from './QuickPanneau.jsx';
import { ThemeContext } from '../../context/ThemeContext';

const TimerPom = ({ pomodoro, pauseCourte, pauseLongue }) => {
  const { theme } = useContext(ThemeContext);
  const themeClass = theme.toLowerCase().replace(' ', '-');

  return (
    <div className={`all_timer_container ${themeClass}`}>
      <CircleTimer
        pomodoro={pomodoro}
        pauseCourte={pauseCourte}
        pauseLongue={pauseLongue}
      />
      <QuickPanneau />
    </div>
  );
};

export default TimerPom;
