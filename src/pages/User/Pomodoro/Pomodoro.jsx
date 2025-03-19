import React from 'react'
import TimerPom from '../../../components/layout/Dashboard/Pomodoro comp/TimerPom'
import Navbar from '../../../components/layout/Navbar/Navbar'


const Pomodoro = () => {
  return (
    <div>
      
      <body>
        <header>
          <nav>
            <Navbar/>
          </nav>

        </header>

        <section>
          
          <TimerPom/>
        </section>
         

      </body>
      


    </div>
  )
}

export default Pomodoro