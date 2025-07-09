import React, { Component } from 'react';
import './PomoCard.css';
import tomato from "../../assets/tomato.png"

class PomoCard extends Component {
  render() {
    return (
      <div className='PomodoroCard-container m-lg-0 mt-4'>
              <header> Last Pomodoro Session </header>
         <div className='pomodoro-card rounded p-3'>
          <header className='border-bottom'> </header>
            <table className="pomo-table table-responsive rounded-2 overflow-hidden" >
                  <tbody>
                    <tr>
                      <td className='job'>Task :</td>
                      <td className='data'> Exam Study </td>
                    </tr>
                    <tr>
                      <td className='job'>Work time : </td>
                      <td className='data'> 4 hours </td>
                    </tr>
                    <tr>
                      <td className='job'> Break time : </td>
                      <td className='data'> 10 minutes </td>
                    </tr>
                    <tr>
                      <td className='job' >Number of breaks : </td>
                      <td className='data'> 5 times </td>
                    </tr>
                  </tbody>
                </table>
                <img className='pomo-icon me-3 mt-2' src={tomato} />
                  
      </div>

      </div>
     
    );
  }

}

export default PomoCard;

// <img className='tomato me-3 mt-2' src={tomato} />       

