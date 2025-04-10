import './TimerPom.css';
import CircleTimer from './CircleTimer.jsx';
import QuickPanneau from './QuickPanneau.jsx';

const TimerPom = ({ pomodoro, pauseCourte, pauseLongue }) => {

  return (
    <div className="all_timer_container">
      {/* On passe les valeurs à CircleTimer */}
      <CircleTimer
        pomodoro={pomodoro}
        pauseCourte={pauseCourte}
        pauseLongue={pauseLongue}
      />

      {/* QuickPanneau placé juste après le timer */}
      <QuickPanneau />
    </div>
  );

};



export default TimerPom;
