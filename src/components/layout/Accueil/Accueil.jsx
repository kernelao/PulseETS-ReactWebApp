import React from 'react'
import "./Accueil.css"

import spinner from './spinner.svg'
import checko from './check-o.svg'
import fileicon from './file-document.svg'
import insights from './insights.svg'



const Accueil = () => {
  return (


    <div className='acc_pcontainer'>

      {/*  */}

      <div className='acc_cont1'>
          
          <h2>ProPULSE ta productivité</h2>
          <h5>Planifie.Accumule.Gagne</h5>
          <button className='btn_com_mtn'> Commencer maintenant</button>
          
      </div>

      <div className='acc_cont2'>

        <h2>Votre temps est précieux, <br />Organisez-le avec PULSE</h2>
      </div>

      <div className='acc_cont3'>

        <table class="tg">
            
              <tr >
                <td class="tg-0lax" colspan="2"> <img src={spinner} className='acctab_icon' alt="spinnerLoad" />  <h5>Pomodoro</h5><h5 className='txt_acctab'>Choisissez vos séances, <br />pour de meilleures performances</h5></td>
                <td class="tg-0lax" colspan="2"> <img src={checko} className='acctab_icon' alt="checkIcon" /><h5>Accomplis tes taches</h5> <h5>Planifiez et terminer vos taches en toute simplicité</h5></td>
                <td class="tg-0lax" colspan="2"> <img src={fileicon} className='acctab_icon' alt="noteIcon" /><h5>Prenez des notes</h5><h5>Prenez des notes rapidement et restez structuré</h5></td>
                <td class="tg-0lax" colspan="2"> <img src={insights} className='acctab_icon' alt="statIcon" /><h5>Statistiques & récompenses</h5><h5>Suivez vos progrès et debloquez des recompenses en restant productif</h5></td>
              </tr>
          
        </table>
      </div>

      <div className='acc_cont4'>

        <h2>Approuvé par la science, efficace pour tous</h2>

        <p>"Des recherches montrent que les pauses systématiques, comme celles de la technique <br />
           Pomodoro, apportent des bénéfices sur l'humeur et l'efficacité du travail."</p>

        <h4>Biwer et al., 2023, British Journal of Educational Psychology</h4>

      </div>
    </div>
    

    
  )
}

export default Accueil