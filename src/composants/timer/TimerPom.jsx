import React, { useContext, useState } from 'react';
import './TimerPom.css';
import CircleTimer from './CircleTimer.jsx';
import QuickPanneau from './QuickPanneau.jsx';
import { ThemeContext } from '../../context/ThemeContext';
import ThemeWrapper from '../../components/common/ThemeWrapper.jsx';
import RecompensePopup from '../../components/recompenses/RecompensePopup';

const TimerPom = ({ pomodoro, pauseCourte, pauseLongue }) => {
  const { theme } = useContext(ThemeContext);
  const themeClass = theme.toLowerCase().replace(' ', '-');

  const [popupRecompense, setPopupRecompense] = useState(null);
  
  return (
    <ThemeWrapper>
      <div className={`all_timer_container ${themeClass}`}>
        <CircleTimer
          pomodoro={pomodoro}
          pauseCourte={pauseCourte}
          pauseLongue={pauseLongue}
          setPopupRecompense={setPopupRecompense}
        />
        <QuickPanneau />
        <RecompensePopup
          recompense={popupRecompense}
          onClose={() => setPopupRecompense(null)}
        />
      </div>
    </ThemeWrapper>
  );
};

export default TimerPom;
