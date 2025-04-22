import React, { useEffect, useState } from 'react';
import axios from './../../api/Axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
ChartJS.register(annotationPlugin);

import './stats.css';
import ThemeWrapper from '../../components/common/ThemeWrapper';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const Stats = () => {
  const [mode, setMode] = useState('pomodoro');
  const [stats, setStats] = useState(null);
  const { theme } = useContext(ThemeContext);
const themeClass = theme.toLowerCase().replace(' ', '-');


  const toggleMode = () => {
    setMode(prev => (prev === 'pomodoro' ? 'tasks' : 'pomodoro'));
  };

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/dashboard'); 
        setStats(res.data);
      } catch (err) {
        console.error('Erreur en récupérant les statistiques:', err);
      }
    };

    fetchStats();
  }, []);

  if (!stats) return <p>Chargement des statistiques...</p>;

  const weekData = mode === 'pomodoro' ? stats.pomodorosWeek : stats.tachesWeek;
  const today = mode === 'pomodoro' ? stats.pomodorosToday : stats.tachesToday;
  const total = weekData.reduce((acc, val) => acc + val, 0);
  const average = parseFloat((total / weekData.length).toFixed(1));

  const isDark = themeClass === 'mode-nuit';

  const data = {
    labels: ['L', 'M', 'M', 'J', 'V', 'S', 'D'],
    datasets: [
      {
        label: mode === 'pomodoro' ? 'Séances Pomodoro' : 'Tâches Complétées',
        data: weekData,
        backgroundColor: isDark ? 'rgba(77, 166, 255, 0.7)' : '#001f3f',
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
      annotation: {
        annotations: {
          moyenneLine: {
            type: 'line',
            yMin: average,
            yMax: average,
            borderColor: 'red',
            borderWidth: 2,
            borderDash: [6, 6], 
            label: {
              display: true,
              content: `Moyenne: ${average}`,
              backgroundColor: 'rgba(255,255,255,0.9)',
              color: 'red',
              font: {
                weight: 'italic',
              },
              position: 'start',
            },
          },
        },
      },
    },
  };
  
  return (
    <ThemeWrapper>
    <div className="stats-wrapper">
      <div className="stats-container">
        <div className="stats-header">
          <h3>Statistiques</h3>
          <button id="voirOption" onClick={toggleMode}>
            Voir {mode === 'pomodoro' ? 'Tâches' : 'Pomodoro'}
          </button>
        </div>
        <Bar data={data} options={options} />
      </div>

      <div className="stats-summary">
        <div className="summary-section">
          <h4>Cette semaine</h4>
          <div className="summary-column">
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
    </ThemeWrapper>
  );
};

export default Stats;
