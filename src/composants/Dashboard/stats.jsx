import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import './stats.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Stats = () => {
  const [mode, setMode] = useState('pomodoro');

  const toggleMode = () => {
    setMode(prev => (prev === 'pomodoro' ? 'tasks' : 'pomodoro'));
  };

  const pomodoroData = [5, 6, 4, 7, 2, 0, 1]; // L -> D
  const taskData = [2, 3, 1, 4, 3, 0, 1];

  const rawData = mode === 'pomodoro' ? pomodoroData : taskData;

  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1; // Lundi = 0, Dimanche = 6
  const today = rawData[todayIndex];
  const total = rawData.reduce((acc, val) => acc + val, 0);
  const average = (total / rawData.length).toFixed(1);

  const data = {
    labels: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
    datasets: [
      {
        label: mode === 'pomodoro' ? 'Séances Pomodoro' : 'Tâches Complétées',
        data: rawData,
        backgroundColor: '#2f80ed',
        borderRadius: 4,
        barThickness: 20,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: { stepSize: 1 },
      },
    },
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="stats-container">
      <div className="stats-header">
        <h3>Statistiques</h3>
        <button onClick={toggleMode}>
          Voir {mode === 'pomodoro' ? 'Tâches' : 'Pomodoro'}
        </button>
      </div>

      <Bar data={data} options={options} />

      <div className="stats-summary">
        <div className="summary-section">
          <h4>Cette semaine</h4>
          <div className="summary-row">
            <div>
              <p>Aujourd’hui</p>
              <strong>{today}</strong>
            </div>
            <div>
              <p>Totale</p>
              <strong>{total}</strong>
            </div>
            <div>
              <p>Moyenne/jour</p>
              <span>{average}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
