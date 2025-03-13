import React from 'react'
import './App.css'
import Navbar_accueil from './components/layout/Navbar/Navbar_accueil.jsx'
import Accueil from './components/layout/Accueil/Accueil.jsx'

function App() {
  return (

<body className='accueil_cont'>

  <header className='navbar-accueil'>

    <nav>
      <Navbar_accueil/>
    </nav>
  </header>

  

    <div className='accueil_info'>
      <Accueil/>
    </div>

 

   
</body>
        
  )
}

export default App