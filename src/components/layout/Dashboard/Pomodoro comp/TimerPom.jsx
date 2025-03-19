
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import './TimerPom.css'
import CirclePom from './CircleTimer.jsx';

const TimerPom = () => {
    return ( 

        <div className="all_timer_container">

            
            
            <div className='btn_timer_container'>
                <button className='timer_btn' >Pomodoro</button>
                <button className='timer_btn'>Courte Pause</button>
                <button className='timer_btn'>Longue Pause</button>
            </div>
            <div /*className='time_child'*/>

                <CirclePom/>
                  
                </div>
            <div className='timer_container'>

                
                
                
           </div>
        </div>



);
}
 
export default TimerPom;