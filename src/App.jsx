import React from 'react'
import './app.css'
import AppRouter from './routes/AppRouter'
import AuthProvider from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>  {/* Le ThemeProvider englobe tout */}
        <UserProvider>
          <AppRouter />
        </UserProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
