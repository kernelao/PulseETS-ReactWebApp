import React, { useEffect, useState, useContext } from 'react';
import Greeting from './Greeting';
import Stats from './Stats';
import axios from './../../api/Axios';
import './dash.css';
import { ThemeContext } from '../../context/ThemeContext';
import { useOutletContext } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Dash = () => {
  const [username, setUsername] = useState('User');
  const { changeTheme } = useContext(ThemeContext);
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
    <div className="dashboard-container">
      <Greeting username={username} />
      <Stats />
    </div>
  );
};

export default Dash;
