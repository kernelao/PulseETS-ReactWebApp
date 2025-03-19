
import { useState } from "react";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'; 
import './CircleTimer.css';


  

  


  
function CirclePom() {

     const [isPlaying, setIsPlaying] = useState(false);
    
    console.log("Le composant s'est re-render avec isPlaying:", isPlaying);
    return (  
    <div>

        <CountdownCircleTimer

key={isPlaying} // Ajout de cette clé pour forcer le re-render quand on redémarre
isPlaying={isPlaying}
            
        
            
            duration={10}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[10, 6, 3, 0]}
            onComplete={() => ({ shouldRepeat: true, delay: 1 })}
          >
            {({ remainingTime }) => <h1>{remainingTime}</h1>}
            
          </CountdownCircleTimer>
          <div>
                                <button onClick={() => setIsPlaying(true)} className='start_btn' >start</button>
                                <button onClick={() => setIsPlaying(false)} className='start_btn' >stop</button>
          </div>
    </div>
    );
}
export default CirclePom;