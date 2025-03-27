
import { useState } from "react";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'; 
import './CircleTimer.css';


  

  


  
function CirclePom() {

  const POM_CYCLE = 25 * 60;
  const SMALL_BREAK= 5 * 60;
  const LONG_BREAK = 30 * 60;
  const CYCLE_COUNT = 4; // Nombre de cycles avant une longue pause

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(POM_CYCLE);
  const [cycle, setCycle] = useState(1);
  const [key, setKey] = useState(0);

  const formatTime = (remainingTime) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
};

// Gérer la fin du cycle
const handleComplete = () => {
    if (cycle % CYCLE_COUNT === 0) {
        setDuration(LONG_BREAK);
        setCycle(1); // Réinitialise le cycle après une longue pause
    } else {
        setDuration(duration === POM_CYCLE ? SMALL_BREAK : POM_CYCLE);
        setCycle(duration === POM_CYCLE ? cycle : cycle + 1);
    }
    return { shouldRepeat: true, delay: 1 };
};

const handleReset = () => {
  setIsPlaying(false);
  setDuration(POM_CYCLE);
  setCycle(1);
  setKey(prevKey => prevKey + 1); // Change la clé pour forcer le reset du timer
};

const handleSetDuration = (newDuration) => {
  setIsPlaying(false);
  setDuration(newDuration);
  setKey(prevKey => prevKey + 1); // Force la réinitialisation du timer
};
  
    return (  
    <div className="cercle_main">

            <div className='btn_timer_container'>
                <button onClick={() => handleSetDuration(POM_CYCLE)}    className='timer_btn' >Pomodoro</button>
                <button onClick={() => handleSetDuration(SMALL_BREAK)}  className='timer_btn'>Courte Pause</button>
                <button onClick={() => handleSetDuration(LONG_BREAK)}  className='timer_btn'>Longue Pause</button>
            </div> 

        <div className="cercle_box">
         
          <CountdownCircleTimer
              key={key}
              isPlaying={isPlaying}
              duration={duration}
              colors={["#D2E3C0", "#C6DEAE", "#A30000"]}
              colorsTime={[duration, duration / 2, 5]}
              onComplete={handleComplete}
            >
          
           {({ remainingTime }) => <h1 className="text_cercle">{formatTime(remainingTime)}</h1>}
          
            </CountdownCircleTimer>
           
            <div className='button_srt_container'>
              <button onClick={() => setIsPlaying(true)} className='start_btn' >start</button>
              <button onClick={() => setIsPlaying(false)} className='start_btn' >stop</button>
              <button onClick={handleReset} className='start_btn'>reset</button>
            </div>
        </div>


       
          

          
       


    </div>
    );
}
export default CirclePom;