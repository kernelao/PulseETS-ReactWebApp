import { useState, useRef, useEffect } from "react";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'; 
import './CircleTimer.css';
import alarmSoundFile from "./alarmepulse.mp3"; 

function CirclePom() {
  const [pomCycle, setPomCycle] = useState(25 * 60);
  const [smallBreak, setSmallBreak] = useState(5 * 60);
  const [longBreak, setLongBreak] = useState(15 * 60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(pomCycle);
  const [cycle, setCycle] = useState(1);
  const [key, setKey] = useState(0);
  const [isAlarmPlaying, setIsAlarmPlaying] = useState(false);
  const [nextDuration, setNextDuration] = useState(null);
  const alarmSound = useRef(new Audio(alarmSoundFile));

  useEffect(() => {
    alarmSound.current.loop = true;
    alarmSound.current.load();
    if ("Notification" in window) {
      Notification.requestPermission();
    }
  }, []);

  const formatTime = (remainingTime) => {
    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  const handleConfirmTime = (newTime) => {
    setIsPlaying(false);
    setDuration(newTime);
    setKey(prevKey => prevKey + 1);
  };

  return (
    <div className="cercle_main">
      <div className='btn_timer_container'>
        <button onClick={() => setDuration(pomCycle)} className='timer_btn animated_btn'>Pomodoro</button>
        <button onClick={() => setDuration(smallBreak)} className='timer_btn animated_btn'>Courte Pause</button>
        <button onClick={() => setDuration(longBreak)} className='timer_btn animated_btn'>Longue Pause</button>
      </div>

      <div className="cercle_box">
        <CountdownCircleTimer
          key={key}
          isPlaying={isPlaying}
          duration={duration}
          colors={["#10217f", "#091245", "#060B26"]}
        >
          {({ remainingTime }) => <h1 className="text_cercle">{formatTime(remainingTime)}</h1>}
        </CountdownCircleTimer>

        <div className='button_srt_container'>
          <button onClick={() => setIsPlaying(true)} className='start_btn animated_btn'>start</button>
          <button onClick={() => setIsPlaying(false)} className='start_btn animated_btn'>stop</button>
          <button onClick={() => setDuration(pomCycle)} className='start_btn animated_btn'>reset</button>
        </div>
      </div>

      <div className='time_input_container'>
        <div className="input-group">
          <label>Pomodoro (minutes):</label>
          <input type='number' value={pomCycle / 60} onChange={(e) => setPomCycle(e.target.value * 60)} />
          <button onClick={() => handleConfirmTime(pomCycle)} className="ok-btn">OK</button>
        </div>
        <div className="input-group">
          <label>Courte Pause (minutes):</label>
          <input type='number' value={smallBreak / 60} onChange={(e) => setSmallBreak(e.target.value * 60)} />
          <button onClick={() => handleConfirmTime(smallBreak)} className="ok-btn">OK</button>
        </div>
        <div className="input-group">
          <label>Longue Pause (minutes):</label>
          <input type='number' value={longBreak / 60} onChange={(e) => setLongBreak(e.target.value * 60)} />
          <button onClick={() => handleConfirmTime(longBreak)} className="ok-btn">OK</button>
        </div>
      </div>
    </div>
  );
}

export default CirclePom;