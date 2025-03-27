import React from 'react'
import './app.css'
import AppRouter from './routes/AppRouter'
import AuthProvider from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  )
=======
    
  );
}

export default App
