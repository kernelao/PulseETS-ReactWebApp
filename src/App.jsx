import React from 'react'; 
import './App.css';
import PageAccueil from './components/layout/Accueil/PageAccueil';
import PomodoroTimer from './pages/User/Pomodoro/Pomodoro.jsx';

function App() {
  return (

  <div>
    {/*<PageAccueil/>*/}

      <PomodoroTimer/>
      
  </div>
        
  )
}

export default App