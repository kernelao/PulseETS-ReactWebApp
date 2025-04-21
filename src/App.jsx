import React from 'react'
import './app.css'
import AppRouter from './routes/AppRouter'
import AuthProvider from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider } from './context/UserContext';
import './components/common/theme.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <AuthProvider>
      <ThemeProvider>  {/* Le ThemeProvider englobe tout */}
        <UserProvider>
          <AppRouter />
          <ToastContainer />
        </UserProvider>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
