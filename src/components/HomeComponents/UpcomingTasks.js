import React, { Component, useState } from 'react';
import './UpcomingTasks.css';


class UpcomingTasks extends Component {

    render() {
        return (
                <div className='UpcomingTasks me-3'>
                    <div className='container p-3'>
                        <div className='row'>
                            <div className='col-3 d-flex flex-column justify-content-center align-items-center'>
                                <h2 className='DoThings'> Get Things Done! </h2>
                                <h6 className='tip'> Check your upcoming deadlines </h6>
                            </div>
                            <div className='col-9 d-flex justify-content-center align-items-center '>
                                <table className="table rounded-3 overflow-hidden table-hover ">
                                    <thead >
                                        <tr>
                                            <th scope="col">#</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Expiration</th>
                                            <th scope="col">Remaining time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <th scope="row">1</th>
                                            <td>Exam</td>
                                            <td>30 May 2025</td>
                                            <td>2 month </td>
                                        </tr>
                                        <tr>
                                            <th scope="row">2</th>
                                            <td>Meeting</td>
                                            <td>20 April 2025</td>
                                            <td>1 month</td>
                                        </tr>
                                        <tr>
                                            <th scope="row">3</th>
                                            <td>task</td>
                                            <td>deadline</td>
                                            <td>remaining time</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

        );
    }

}

export default UpcomingTasks;

