import React, { Component } from 'react';
import './PomoCard.css';
import tomato from "../../assets/tomato.png"

class PomoCard extends Component {
  render() {
    return (
      <div className='pomodoro p-3'>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-8'> 
            <table className="table table-responsive rounded-2 overflow-hidden" >
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
            </div>
            <div className='col-4 d-flex justify-content-center'>
                <img className='tomato' src={tomato} />
            </div>
          </div>
          
        </div>
      </div>
    );
  }

}

export default PomoCard;

