import { useState, useRef, useEffect} from "react";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'; 
import './CircleTimer.css';
import alarmSoundFile from "./alarmepulse.mp3"; // Importation directe du fichier

function CirclePom() {
  const POM_CYCLE = 25*60;
  const SMALL_BREAK = 5 * 60;
  const LONG_BREAK = 30 * 60;
  const CYCLE_COUNT = 4;

  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(POM_CYCLE);
  const [cycle, setCycle] = useState(1);
  const [key, setKey] = useState(0);
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);
  const [nextDuration, setNextDuration] = useState(null);
  const alarmSound = useRef(new Audio(alarmSoundFile));

  useEffect(() => {
    alarmSound.current = new Audio(alarmSoundFile);
    alarmSound.current.loop = true; // Activation de la lecture en boucle
    alarmSound.current.load(); // Charge l'audio à l'avance
  }, []);


  const formatTime = (remainingTime) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const playAlarm = () => {
    setIsPlaying(false); // Met en pause le timer
    setIsAlarmPlaying(true);
    if (alarmSound.current) {
      alarmSound.current.currentTime = 0;
      alarmSound.current.play().catch((error) => console.error("Echec alarme ", error));
    }
  };

  const stopAlarm = () => {
    setIsAlarmPlaying(false);
    if (alarmSound.current) {
      alarmSound.current.pause();
      alarmSound.current.currentTime = 0;
    }
    if (nextDuration !== null) {
      setDuration(nextDuration);
      setNextDuration(null);
      setKey(prevKey => prevKey + 1);
      setIsPlaying(true);
    }
  };

  const handleComplete = () => {
    playAlarm();
    if (cycle % CYCLE_COUNT === 0) {
      setNextDuration(LONG_BREAK);
      setCycle(1);
    } else {
      setNextDuration(duration === POM_CYCLE ? SMALL_BREAK : POM_CYCLE);
      setCycle(duration === POM_CYCLE ? cycle : cycle + 1);
    }
    return { shouldRepeat: false };
  };

  const handleReset = () => {
    setIsPlaying(false);
    setDuration(POM_CYCLE);
    setCycle(1);
    setKey(prevKey => prevKey + 1);
    setIsAlarmPlaying(false);
    setNextDuration(null);
    if (alarmSound.current) {
      alarmSound.current.pause();
      alarmSound.current.currentTime = 0;
    }
  };

  const handleSetDuration = (newDuration) => {
    setIsPlaying(false);
    setDuration(newDuration);
    setNextDuration(null);
    setKey(prevKey => prevKey + 1);
  };

  return (
    <div className="cercle_main">
      <div className='btn_timer_container'>
        <button onClick={() => handleSetDuration(POM_CYCLE)} className='timer_btn'>Pomodoro</button>
        <button onClick={() => handleSetDuration(SMALL_BREAK)} className='timer_btn'>Courte Pause</button>
        <button onClick={() => handleSetDuration(LONG_BREAK)} className='timer_btn'>Longue Pause</button>
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
          {isAlarmPlaying ? (
            <button onClick={stopAlarm} className='start_btn'>Stop Alarm</button>
          ) : (
            <>
              <button onClick={() => setIsPlaying(true)} className='start_btn'>start</button>
              <button onClick={() => setIsPlaying(false)} className='start_btn'>stop</button>
              <button onClick={handleReset} className='start_btn'>reset</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CirclePom;