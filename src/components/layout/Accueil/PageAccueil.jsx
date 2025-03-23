import React from 'react'
import Navbar_accueil from '../Navbar/Navbar_accueil.jsx'
import Accueil from './Accueil.jsx'

function PageAccueil() {
    return ( 


        <div>

    
            <header >
                <nav>
                 <Navbar_accueil/>
                </nav>
            </header>



            <div className='accueil_info'>
            <Accueil/>
            </div>
        
        </div>
    );
}

export default PageAccueil;