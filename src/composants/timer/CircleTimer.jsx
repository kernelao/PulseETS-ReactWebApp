import React, { useState, useRef, useEffect} from "react";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'; 
import './CircleTimer.css';
import alarmSoundFile from "./alarmepulse.mp3"; 

function CirclePom() {
    
  const [mode, setMode] = useState('pomodoro'); // pomodoro | pauseCourte | pauseLongue
  const [isPlaying, setIsPlaying] = useState(false);
  const [auto, setAuto] = useState(false);
  const [autoActive, setAutoActive] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [pomodoroCount, setPomodoroCount] = useState(0);

  const alarmSound = useRef(null);
  const alarmTimeoutRef = useRef(null);

  const duration ={
       pomodoro :25 *60,
       pauseCourte: 5*60,
       pauseLongue: 15*60,
       
  };
  
  useEffect(() => {
    alarmSound.current = new Audio(alarmSoundFile);
    alarmSound.current.loop = true; 
  }, []);


  

  const stopAlarm = () => {
    if (alarmSound.current) {
      alarmSound.current.pause();
      alarmSound.current.currentTime = 0;
    }
    if (alarmTimeoutRef.current) {
      clearTimeout(alarmTimeoutRef.current);
    }
  };

  const playAlarm = () => {
    if (alarmSound.current) {
      alarmSound.current.play();
      alarmTimeoutRef.current = setTimeout(() => {
        stopAlarm();
      }, 5500); // arrete apres 8 seconde
    }
  };

  const handleStart = () => {
    if (auto) {
      setAutoActive(true);
    }
    setIsPlaying(true);
  };


  const handlePause = () => setIsPlaying(false);

  const handleReset = () => {
    setIsPlaying(false);
    setMode('pomodoro');
    setPomodoroCount(0);
    setTimerKey(prev => prev + 1);
    stopAlarm();
    setAutoActive(false);
  };


  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsPlaying(false);
    setTimerKey(prev => prev + 1);
    stopAlarm();
  };


  const handleAutoToggle = () => {
    setAuto(prev => {
      const next = !prev;
      if (!next) {
        setAutoActive(false);
      }
      return next;
    });
  };

  const handleComplete = () => {
    playAlarm();

    if (Notification.permission === 'granted') {
      new Notification(`[PULSE] Fin de ${mode === 'pomodoro' ? 'la session de travail' : mode === 'pauseCourte' ? 'la pause courte' : 'la pause longue'}`);
    }

    const nextState = () => {
      if (mode === 'pomodoro') {
        const nextCount = pomodoroCount + 1;
        if (nextCount >= 4) {
          setPomodoroCount(0);
          return 'pauseLongue';
        } else {
          setPomodoroCount(nextCount);
          return 'pauseCourte';
        }
      } else {
        return 'pomodoro';
      }
    };

    const nextMode = nextState();
    setMode(nextMode);
    setTimerKey(prev => prev + 1);

    if (auto && autoActive) {
      setIsPlaying(true);
    } else {
      setIsPlaying(false);
    }

    return { shouldRepeat: false };
  };


  const getButtonStyle = (btnMode) => ({
    backgroundColor: mode === btnMode ? ' #8997e6' : '#10217f',
    color: mode === btnMode ? 'white' : 'white',
    border: '1px solid #ccc',
    margin: '5px',
    padding: '10px 20px',
    borderRadius: '5px',
    cursor: 'pointer'
  });
  

  return (
    <div className="cercle_main" >
      <div className='btn_timer_container'>
        <button onClick={() => handleModeChange('pomodoro')}  style={getButtonStyle('pomodoro')} className='timer_btn animated_btn'>Pomodoro</button>
        <button onClick={() => handleModeChange('pauseCourte')}  style={getButtonStyle('pauseCourte')} className='timer_btn animated_btn'>Courte Pause</button>
        <button onClick={() => handleModeChange('pauseLongue')}style={getButtonStyle('pauseLongue')}  className='timer_btn animated_btn'>Longue Pause</button>
      </div>

      <div className="cercle_box">
        <CountdownCircleTimer
          key={timerKey}
          isPlaying={isPlaying}
          duration={duration[mode]}
          colors={[ "#10217f","#091245","#060B26"]}
          colorsTime={[duration, duration / 2, 5]}
          onComplete={handleComplete}
        >
           {({ remainingTime }) => {
          const minutes = Math.floor(remainingTime / 60);
          const seconds = remainingTime % 60;
          return (
            <div style={{ fontSize: '32px' }}>
              {`${minutes}:${seconds.toString().padStart(2, '0')}`}
            </div>
          );
        }}
      </CountdownCircleTimer>
      </div>

        <div className='button_srt_container'>
         
           
              <button onClick={handleStart} className='start_btn animated_btn'>Démarrer</button>
              <button onClick={handlePause} className='start_btn animated_btn'>Pause</button>
              <button onClick={handleReset} className='start_btn animated_btn'>Réinitialiser</button>
      
        
        </div>

        
      <div className="auto_cont">
        <label>
          <input type="checkbox" checked={auto} onChange={handleAutoToggle} />
          Mode automatique
        </label>
      </div>

      <div className="txt_pom_comsecutif">
        <strong>Pomodoros consécutifs : {pomodoroCount} / 4</strong>
      </div>




      
    </div>
  );
}

export default CirclePom;