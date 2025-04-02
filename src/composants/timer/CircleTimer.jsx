import { useState, useRef, useEffect} from "react";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'; 
import './CircleTimer.css';
import alarmSoundFile from "./alarmepulse.mp3"; 

function CirclePom() {
  const POM_CYCLE =25*60;
  const SMALL_BREAK = 5*60;
  const LONG_BREAK = 15*60;
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

    // Demande la permission pour afficher des notifications
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);


  const formatTime = (remainingTime) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  //fonction pour jouer l'alarme 
  const playAlarm = () => {
    setIsPlaying(false); // Met en pause le timer
    setIsAlarmPlaying(true);
    if (alarmSound.current) {
      alarmSound.current.currentTime = 0;
      alarmSound.current.play().catch((error) => console.error("Echec alarme ", error));
    }
  };


// fonction pour afficher les notifications
  const showNotification = (message) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification(message);
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

    if (duration === POM_CYCLE) {
      // Si c'est un cycle Pomodoro (travail)
      if (cycle < CYCLE_COUNT) {
        showNotification("[PULSE] Temps de prendre une courte pause");
        setNextDuration(SMALL_BREAK);
      } else {
        // Après 4 cycles de travail, passer à la longue pause
        showNotification("[PULSE] Temps de prendre une longue pause");
        setNextDuration(LONG_BREAK);
        setCycle(1); // Réinitialiser le cycle après la longue pause
      }
    } else if (duration === SMALL_BREAK) {
      // Si c'est une courte pause
      showNotification("[PULSE] Temps de travailler!");
      setNextDuration(POM_CYCLE);
    } else if (duration === LONG_BREAK) {
      // Si c'est une longue pause
      showNotification("[PULSE] Temps de commencer un nouveau cycle");
      setNextDuration(null); // Ne pas redémarrer le timer
      setIsPlaying(false); // Arrêter le timer

    // Réinitialiser les paramètres pour le début du prochain cycle
      setCycle(1);
      setDuration(POM_CYCLE); // Mettre la durée par défaut pour un cycle Pomodoro
      return { shouldRepeat: false };
    }

    // Incrémenter le cycle si nécessaire
    if (duration === POM_CYCLE && cycle < CYCLE_COUNT) {
      setCycle(cycle + 1); // Passer au cycle suivant
    }

    

    return { shouldRepeat: false}; 
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
        <button onClick={() => handleSetDuration(POM_CYCLE)} className='timer_btn animated_btn'>Pomodoro</button>
        <button onClick={() => handleSetDuration(SMALL_BREAK)} className='timer_btn animated_btn'>Courte Pause</button>
        <button onClick={() => handleSetDuration(LONG_BREAK)} className='timer_btn animated_btn'>Longue Pause</button>
      </div>

      <div className="cercle_box">
        <CountdownCircleTimer
          key={key}
          isPlaying={isPlaying}
          duration={duration}
          colors={[ "#10217f","#091245","#060B26"]}
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
              <button onClick={() => setIsPlaying(true)} className='start_btn animated_btn'>start</button>
              <button onClick={() => setIsPlaying(false)} className='start_btn animated_btn'>stop</button>
              <button onClick={handleReset} className='start_btn animated_btn'>reset</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default CirclePom;