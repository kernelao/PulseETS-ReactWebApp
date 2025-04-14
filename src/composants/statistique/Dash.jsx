import React from 'react';
import Greeting from './Greeting';
import Stats from './Stats';
import './dash.css';

const Dash = () => {
    return (
      <div className="dashboard-container">
        <Greeting username="User" /> 
        <Stats />
      </div>
    );
  };

export default Dash;