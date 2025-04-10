import React from 'react'
import './app.css'
import AppRouter from './routes/AppRouter'
import AuthProvider from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>  {/* Le ThemeProvider englobe tout */}
        <AppRouter />
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
