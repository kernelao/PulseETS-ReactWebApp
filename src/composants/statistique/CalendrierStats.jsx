import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendrierStats.css'; 

const CalendrierStats = ({ data }) => {
  const today = new Date();

  const getTileStyle = ({ date, view }) => {
    if (view !== 'month') return {}; 

    const dateString = date.toISOString().split('T')[0];
    const activityLevel = data[dateString] || 0;

    if (activityLevel === 0) {
      return { backgroundColor: '#e0e0e0' }; 
    }
    if (activityLevel >= 5) {
      return { backgroundColor: '#228B22', color: 'white' }; 
    }
    if (activityLevel >= 3) {
      return { backgroundColor: '#32CD32', color: 'white' }; 
    }
    return { backgroundColor: '#90EE90', color: 'white' }; 
  };

  return (
    <div className="calendar-stats-wrapper">
      <Calendar
        value={today}
        tileContent={({ date, view }) => null}
        tileClassName={({ date, view }) => null}
        tileStyle={getTileStyle}
      />
    </div>
  );
};

export default CalendrierStats;
