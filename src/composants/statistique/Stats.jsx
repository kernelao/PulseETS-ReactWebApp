import React, { useEffect, useState, useContext } from 'react';
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
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { ThemeContext } from '../../context/ThemeContext';
import './stats.css';

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, annotationPlugin);

const generateFullHeatmapData = (start, end, rawValues = []) => {
  const result = [];
  const current = new Date(start);
  const dataMap = new Map(rawValues.map(item => [item.date, item.count]));

  while (current <= end) {
    const dateStr = current.toISOString().split('T')[0];
    result.push({
      date: dateStr,
      count: dataMap.get(dateStr) || 0,
    });
    current.setDate(current.getDate() + 1);
  }

  return result;
};

const Stats = () => {
  const [mode, setMode] = useState('pomodoro');
  const [view, setView] = useState('graph');
  const [stats, setStats] = useState(null);
  const { theme } = useContext(ThemeContext);
  const themeClass = theme.toLowerCase().replace(' ', '-');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('/dashboard');
        console.log("✅ Réponse complète de /dashboard :", res.data);
        console.log("🔥 streaksTaches :", res.data.streaksTaches);
        console.log("🔥 streaksPomodoro :", res.data.streaksPomodoro);
        setStats(res.data);
      } catch (err) {
        console.error('❌ Erreur lors de la récupération des stats :', err);
      }
    };
    fetchStats();
  }, []);
  
  if (!stats) return <p>Chargement des statistiques...</p>;

  const weekData = mode === 'pomodoro' ? stats.pomodorosWeek : stats.tachesWeek;
  const today = mode === 'pomodoro' ? stats.pomodorosToday : stats.tachesToday;
  const streaksData = mode === 'pomodoro' ? stats.streaksPomodoro : stats.streaksTaches;

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

  const todayDate = new Date();
  const startDate = new Date(todayDate.getFullYear(), todayDate.getMonth() - 3, 1);
  const heatmapValues = generateFullHeatmapData(startDate, todayDate, streaksData || []);
  console.log("📆 Données générées pour la heatmap :", heatmapValues);

  return (
    <div className="stats-wrapper">
      <div className="stats-container">
        <div className="stats-header">
          <h3>Statistiques</h3>
          <div className="button-wrapper" style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => setView(view === 'graph' ? 'calendar' : 'graph')}>
              {view === 'graph' ? 'Vue Calendrier' : 'Vue Graphique'}
            </button>
            <button id="voirOption" onClick={() => setMode(prev => (prev === 'pomodoro' ? 'tasks' : 'pomodoro'))}>
              Voir {mode === 'pomodoro' ? 'Tâches' : 'Pomodoro'}
            </button>
          </div>
        </div>

        {view === 'graph' ? (
          <Bar data={data} options={options} />
        ) : (
          <div className="heatmap-wrapper">
            <div>
              <CalendarHeatmap
                startDate={startDate}
                endDate={todayDate}
                values={heatmapValues}
                classForValue={(value) => {
                  console.log("🧩 Valeur reçue dans classForValue :", value);
                  if (!value || value.count === 0) return 'color-empty';
                  if (value.count < 2) return 'color-scale-1';
                  if (value.count < 4) return 'color-scale-2';
                  if (value.count < 7) return 'color-scale-3';
                  if (value.count < 10) return 'color-scale-4';
                  return 'color-scale-5';
                }}
                titleForValue={(value) => {
                  if (!value || !value.date) return 'Aucune donnée';
                  return `${value.count || 0} ${mode === 'pomodoro' ? 'séance(s) Pomodoro' : 'tâche(s) complétée(s)'} le ${value.date}`;
                }}
                
                rectSize={18} // ← 🔥 forcer la taille des rectangles
  gutterSize={4} // ← 🔥 espacement entre cases
              />
              <div className="heatmap-legend">
                <span>Moins</span>
                <span className="color-box color-scale-1" />
                <span className="color-box color-scale-2" />
                <span className="color-box color-scale-3" />
                <span className="color-box color-scale-4" />
                <span className="color-box color-scale-5" />
                <span>Plus</span>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="stats-summary">
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
  );
};

export default Stats;
