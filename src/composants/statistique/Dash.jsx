import React, { useEffect, useState, useContext } from 'react';
import Greeting from './Greeting';
import Stats from './Stats';
import axios from './../../api/Axios';
import './dash.css';
import { ThemeContext } from '../../context/ThemeContext';
import { useOutletContext } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ThemeWrapper from '../../components/common/ThemeWrapper';

const Dash = () => {
  const [username, setUsername] = useState('User');
  const { changeTheme, theme } = useContext(ThemeContext);
  const themeClass = theme.toLowerCase().replace(' ', '-');
    const { setPomodoro, setPauseCourte, setPauseLongue } = useOutletContext();
  const { token } = useAuth();
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 1. Récupérer nom utilisateur
        const res = await axios.get('/dashboard');
        setUsername(res.data.user?.username || 'User');

        // 2. Récupérer les réglages du bon utilisateur (grâce au token)
        const reglageRes = await axios.get('/reglages/me', {
          headers: { Authorization: `Bearer ${token}` }
        });

        const r = reglageRes.data;
        setPomodoro(r.pomodoro);
        setPauseCourte(r.courte_pause ?? 5);
        setPauseLongue(r.longue_pause ?? 15);
        changeTheme(r.theme);
      } catch (err) {
        console.error('Erreur chargement utilisateur ou réglages :', err);
      }
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  return (
    
    <ThemeWrapper>
    <div className={`dashboard-container ${themeClass}`}>
      <Greeting username={username} />
      <div className="stats-wrapper">
        <Stats />
      </div>
    </div>
    </ThemeWrapper>
  );
};

export default Dash;
