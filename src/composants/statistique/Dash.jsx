import React, { useEffect, useState, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import Greeting from './Greeting';
import Stats from './Stats';
import axios from './../../api/Axios';
import './dash.css';
import ThemeWrapper from '../../components/common/ThemeWrapper';

const Dash = () => {
  const [username, setUsername] = useState('User');
  const { theme } = useContext(ThemeContext);
  const themeClass = theme.toLowerCase().replace(' ', '-');

  useEffect(() => {
    axios.get('/dashboard')
      .then(res => setUsername(res.data.user?.username || 'User'))
      .catch(console.error);
  }, []);

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
