import CalendarComponent from "./CalendarComponent"
import EventForm from "./EventForm"
import './CalendarPage.css'
import Activity from './Activity'
import {useState} from 'react';

function CalendarPage(){
    const [click, clicked]=useState(false);

    const events = {
        "2025-03-05": ["Drink Coffee", "Learn React", "Sleep"],
        "2025-03-06": ["Drink Coffee", "Learn Angular", "Sleep"],
        "2025-04-09": ["dinner with Maria", "Drink"],
        "2025-03-21": ["Drink Coffee", "Learn React", "Sleep"],
        "2025-03-24": ["Drink Coffee", "Learn Vue", "Sleep"],
    };
    const activities={
        "2025-04-05": "OS project",
        "2025-04-10": "Tecnologie Web",
        "2025-05-05": "website creation",
        "2025-04-15": "English language exam",
    }
    return(
        <>
            <div className="container-fluid p-3">
                <div className="row" style={{alignItems:"center"}}>
                <div className="col-12 col-lg-8 ">    
                        <CalendarComponent events={events}></CalendarComponent>
                    </div>
                    <div className="col-12 col-lg-3">
                        <div className="row">
                            <Activity activities={activities}></Activity>
                            <div className="pt-4">
                                <div className="d-grid gap-2">
                                    <button onClick={() => clicked(true)} id="buttonEffect" type="button" className={`btn-lg rounded p-3 ${click ? "animation" : ""}`} data-bs-toggle="modal"
                                        data-bs-target="#exampleModal">
                                        ADD EVENT</button>
                                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
                                        aria-hidden="true">
                                        <div  className="modal-dialog modal-dialog-centered">
                                            <div  id="modal-window" className="modal-content border border-white text-white">
                                                <div className="modal-header">
                                                    <h1 className="modal-title fs-5" id="exampleModalLabel">New event</h1>
                                                    <button onClick={() => clicked(false)} type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"
                                                        aria-label="Close"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <EventForm></EventForm>
                                                </div>
                                                <div className="modal-footer">
                                                    <button onClick={() => clicked(false)} type="button" className="buttonClose btn"
                                                        data-bs-dismiss="modal">Close</button>
                                                    <button type="button" className="buttonSave btn">Save changes</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
export default CalendarPage
    