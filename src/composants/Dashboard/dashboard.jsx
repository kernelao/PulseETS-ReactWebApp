import React from 'react';
import Greeting from './Greeting';
import Stats from './Stats';
import './dash.css';

const Dashboard = () => {
  
  return (
<div className="dashboard-layout">
  <div className="left"><Stats /></div>
  <div className="center"><Greeting /></div>
  </div>

  );
};

export default Dashboard;
