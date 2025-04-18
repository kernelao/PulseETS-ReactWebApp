import React from 'react';
import { useOutletContext } from 'react-router-dom';  // Pour récupérer les valeurs du context
import TimerPom from "../../composants/timer/TimerPom";
import ThemeWrapper from "../../components/common/ThemeWrapper";


const Pomodoro = () => {
  // Récupérer les valeurs depuis le context passé par SidebarLayout
  const { pomodoro, pauseCourte, pauseLongue } = useOutletContext();
  
  // Passer les valeurs à TimerPom
  return (
    <ThemeWrapper>
    <TimerPom pomodoro={pomodoro} pauseCourte={pauseCourte} pauseLongue={pauseLongue} />
    </ThemeWrapper>
  )
}

export default Pomodoro;
