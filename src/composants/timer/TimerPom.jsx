import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import './TimerPom.css';
import CircleTimer from './CircleTimer.jsx';
import QuickPanneau from './QuickPanneau.jsx';

const TimerPom = ({ pomodoro, pauseCourte, pauseLongue }) => {
    return ( 
        <div className="all_timer_container">

            {/* Ici tu peux passer les valeurs au CircleTimer */}
            <CircleTimer
                pomodoro={pomodoro} 
                pauseCourte={pauseCourte} 
                pauseLongue={pauseLongue} 
            />

                <CircleTimer/>
                <QuickPanneau/>
                

        </div>
    );
};


export default TimerPom;



