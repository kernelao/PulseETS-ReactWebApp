import React, { useEffect, useState } from 'react';
import Greeting from './Greeting';
import Stats from './Stats';
import axios from './../../api/Axios';
import './dash.css';

const Dash = () => {
  const [username, setUsername] = useState('User');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const res = await axios.get('/dashboard');
        setUsername(res.data.user?.username || 'User');
      } catch (err) {
        console.error('Erreur en récupérant le nom d’utilisateur:', err);
      }
    };

    fetchUsername();
  }, []);

  return (
    <div className="dashboard-container">
      <Greeting username={username} />
      <Stats />
    </div>
  );
};

export default Dash;
