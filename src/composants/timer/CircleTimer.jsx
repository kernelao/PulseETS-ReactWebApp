import React, { useState, useRef, useEffect, useContext } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { ThemeContext } from "../../context/ThemeContext";
import "./CircleTimer.css";
import alarmSoundFile from "./alarmepulse.mp3";

export default function CirclePom({ pomodoro, pauseCourte, pauseLongue }) {
  const { theme } = useContext(ThemeContext);
  const themeClass = theme.toLowerCase().replace(" ", "-");

// après avoir calculé themeClass…
const primaryColor =
  themeClass === "mode-nuit"
    ? "#3345a7"
    : themeClass === "mode-zen"
      ? "#9cccb5"
      : "#2f80ed";

const secondaryColor =
  themeClass === "mode-jour"
    ? "#ffffff"
    : "#000000";


  const [startTime, setStartTime] = useState(null);
  const [mode, setMode] = useState("pomodoro");
  const [isPlaying, setIsPlaying] = useState(false);
  const [auto, setAuto] = useState(false);
  const [autoActive, setAutoActive] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [pomodoroCount, setPomodoroCount] = useState(0);

  const alarmSound = useRef(null);
  const alarmTimeoutRef = useRef(null);

  const duration = {
    pomodoro: pomodoro * 60,
    pauseCourte: pauseCourte * 60,
    pauseLongue: pauseLongue * 60,
  };

  useEffect(() => {
    alarmSound.current = new Audio(alarmSoundFile);
    alarmSound.current.loop = true;
  }, []);

  const stopAlarm = () => {
    alarmSound.current?.pause();
    alarmSound.current.currentTime = 0;
    clearTimeout(alarmTimeoutRef.current);
  };
  const playAlarm = () => {
    alarmSound.current?.play();
    alarmTimeoutRef.current = setTimeout(stopAlarm, 5500);
  };

  const handleStart = () => {
    if (auto) setAutoActive(true);
    setStartTime(new Date());
    setIsPlaying(true);
  };
  const handlePause = () => setIsPlaying(false);
  const handleReset = () => {
    setIsPlaying(false);
    setMode("pomodoro");
    setPomodoroCount(0);
    setTimerKey((k) => k + 1);
    stopAlarm();
    setAutoActive(false);
  };
  const handleModeChange = (newMode) => {
    setMode(newMode);
    setIsPlaying(false);
    setTimerKey((k) => k + 1);
    stopAlarm();
  };
  const handleAutoToggle = () => setAuto((a) => { if (a) setAutoActive(false); return !a; });

  const sendSessionToAPI = async () => {
    const token = localStorage.getItem("token");
    const endedAt = new Date();
    await fetch("http://localhost:8000/api/pomodoro-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        startedAt: new Date(startTime.getTime() - new Date().getTimezoneOffset() * 60000).toISOString(),
        endedAt:   new Date(endedAt.getTime()   - new Date().getTimezoneOffset() * 60000).toISOString(),
        pomodoros_completes: pomodoroCount,
        pomodoroDuration: duration.pomodoro,
        shortBreak: duration.pauseCourte,
        longBreak: duration.pauseLongue,
        autoStart: auto,
      }),
    });
  };

  const handleComplete = () => {
    playAlarm();
    sendSessionToAPI();
    const notifMsg = mode === "pomodoro" ? "session de travail" : "pause";
    if (Notification.permission === "granted")
      new Notification(`[PULSE] Fin de ${notifMsg}`);

    let next;
    if (mode === "pomodoro") {
      const nextCount = pomodoroCount + 1;
      if (nextCount >= 4) {
        setPomodoroCount(0);
        next = "pauseLongue";
      } else {
        setPomodoroCount(nextCount);
        next = "pauseCourte";
      }
    } else {
      next = "pomodoro";
    }
    setMode(next);
    setTimerKey((k) => k + 1);
    setIsPlaying(auto && autoActive);
    return { shouldRepeat: false };
  };

  const getButtonStyle = (btn) => ({
    backgroundColor: mode === btn ? "#8997e6" : primaryColor,
    color: "white",
    border: "none",
    margin: "5px",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  });

  return (

    <div className={`all_timer_container ${themeClass}`}>
      <div className={`cercle_main ${themeClass}`}>
        <div className="btn_timer_container">
          <button
            onClick={() => handleModeChange("pomodoro")}
            style={getButtonStyle("pomodoro")}
            className="timer_btn animated_btn"
          >
            Pomodoro
          </button>
          <button
            onClick={() => handleModeChange("pauseCourte")}
            style={getButtonStyle("pauseCourte")}
            className="timer_btn animated_btn"
          >
            Courte Pause
          </button>
          <button
            onClick={() => handleModeChange("pauseLongue")}
            style={getButtonStyle("pauseLongue")}
            className="timer_btn animated_btn"
          >
            Longue Pause
          </button>
        </div>

        <div className="cercle_box">
          <CountdownCircleTimer
            key={timerKey}
            isPlaying={isPlaying}
            duration={duration[mode]}
            colors={[primaryColor, secondaryColor]}
            colorsTime={[duration[mode], 5]}
            trailColor="#eee"
            strokeWidth={8}
            onComplete={handleComplete}
          >
            {({ remainingTime }) => {
              const m = Math.floor(remainingTime / 60);
              const s = remainingTime % 60;
              return (
                <div style={{ fontSize: "32px", color: primaryColor }}>
                  {`${m}:${String(s).padStart(2, "0")}`}
                </div>
              );
            }}
          </CountdownCircleTimer>
        </div>

        <div className="button_srt_container">
          <button onClick={handleStart} className="start_btn animated_btn">
            Démarrer
          </button>
          <button onClick={handlePause} className="start_btn animated_btn">
            Pause
          </button>
          <button onClick={handleReset} className="start_btn animated_btn">
            Réinitialiser
          </button>
        </div>

        <div className="auto_cont">
          <label>
            <input type="checkbox" checked={auto} onChange={handleAutoToggle} />{" "}
            Mode auto
          </label>
        </div>

        <div className="txt_pom_comsecutif">
          <strong>Pomodoros consécutifs : {pomodoroCount} / 4</strong>
        </div>
      </div>
    </div>
  );
}
