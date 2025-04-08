import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import './TimerPom.css';
import CircleTimer from './CircleTimer.jsx';

const TimerPom = ({ pomodoro, pauseCourte, pauseLongue }) => {
    return ( 
        <div className="all_timer_container">
            {/* Ici tu peux passer les valeurs au CircleTimer */}
            <CircleTimer
                pomodoro={pomodoro} 
                pauseCourte={pauseCourte} 
                pauseLongue={pauseLongue} 
            />
        </div>
    );
};

export default TimerPom;
