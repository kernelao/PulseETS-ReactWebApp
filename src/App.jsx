import React from 'react'
import './App.css'
import { ThemeProvider } from "./context/ThemeContext";
import Settings from './pages/User/Settings/Settings.jsx'

function App() {
  return (
    <div>
    <ThemeProvider>
      <Settings />
    </ThemeProvider>
    </div>
  )
}

export default App
