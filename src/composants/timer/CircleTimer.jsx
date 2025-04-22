import React, { useState, useRef, useEffect, useContext } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import { ThemeContext } from "../../context/ThemeContext";
import "./CircleTimer.css";
import alarmSoundFile from "./alarmepulse.mp3";
import ThemeWrapper from "../../components/common/ThemeWrapper";
import { useUser } from '../../context/UserContext';
import IMAGES from '/src/assets/badges_recompenses';


export default function CirclePom({ pomodoro, pauseCourte, pauseLongue, setPopupRecompense }) {
  const { theme } = useContext(ThemeContext);
  const themeClass = theme.toLowerCase().replace(" ", "-");

// après avoir calculé themeClass…


const [primaryColor, setPrimaryColor] = useState("#2f80ed");
const [colorKey, setColorKey] = useState(0);
    

  const [startTime, setStartTime] = useState(null);
  const [mode, setMode] = useState("pomodoro");
  const [isPlaying, setIsPlaying] = useState(false);
  const [auto, setAuto] = useState(false);
  const [autoActive, setAutoActive] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const [pomodoroCount, setPomodoroCount] = useState(0);

  const { userData, setUserData } = useUser();

  const alarmSound = useRef(null);
  const alarmTimeoutRef = useRef(null);

  const duration = {
    pomodoro: pomodoro * 60,
    pauseCourte: pauseCourte * 60,
    pauseLongue: pauseLongue * 60,
  };

  const handleNouvelleRecompense = (type, valeur) => {
    const imageMap = {
      'sessionsCompletees-50': IMAGES.i50sessionsComplete,
      'sessionsCompletees-100': IMAGES.i100sessionsComplete,
      'bonusComplet-1000': IMAGES.iBonusComplet,
    };
  
    const cle = `${type}-${valeur}`;
    if (imageMap[cle]) {
      setPopupRecompense({
        image: imageMap[cle],
        description:
          cle === 'bonusComplet-1000'
            ? "🎉 Tu as complété toutes les récompenses et gagné 1000 points bonus !"
            : `Bravo ! Tu as complété ${valeur} sessions Pomodoro !`,
      });
      console.log("🎉 Popup déclenché pour :", cle); // <-- important pour debug
    }
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
    const response = await fetch("http://localhost:8000/api/pomodoro-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({
        startedAt: new Date(startTime.getTime() - new Date().getTimezoneOffset() * 60000).toISOString(),
        endedAt: new Date(endedAt.getTime() - new Date().getTimezoneOffset() * 60000).toISOString(),
        pomodoros_completes: pomodoroCount,
        pomodoroDuration: duration.pomodoro,
        shortBreak: duration.pauseCourte,
        longBreak: duration.pauseLongue,
        autoStart: auto,
      }),
    });
  
    const res = await fetch("http://localhost:8000/api/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  
    const data = await res.json();
    const nouvelles = data.recompenses.filter(r =>
      !(userData?.recompenses ?? []).some(old => old.type === r.type && old.valeur === r.valeur)
    );
    nouvelles.forEach(({ type, valeur }) => {
      handleNouvelleRecompense(type, valeur);
    });
  
    setUserData(prev => ({
      ...prev,
      recompenses: data.recompenses
    }));
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
    <ThemeWrapper>
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
            key={`${timerKey}-${colorKey}`} // 👈 force aussi le re-render quand couleurs changent
            duration={duration[mode]}
            isPlaying={isPlaying}
            colors={["var(--btn)", "var(--folder-hover)"]}
            colorsTime={[duration[mode]]}
            trailColor="var(--note-hover)"
            strokeWidth={8}
            onComplete={handleComplete}
          >
            {({ remainingTime }) => {
              const m = Math.floor(remainingTime / 60);
              const s = remainingTime % 60;
              return (
                <div style={{ fontSize: "32px", color: "var(--btn)" }}>
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
  </ThemeWrapper>
  );
}
