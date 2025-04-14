import './EventForm.css'
import { DateTime, Settings } from 'luxon';

function EventForm(){

    Settings.defaultLocale="it"
    const today=DateTime.local().toLocaleString(DateTime.DATE_SHORT)
    
    return(
        <form id="modal-form" method="get" className='was-validated '>
            <div class="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Title:</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" name="title" placeholder="Business meeting" required/>
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Description</label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="2" name='description'></textarea>
            </div>
            <div class="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Time:</label>
                <input type="time" className="form-control" id="exampleFormControlInput1" name="time" required/>
            </div>
            <div class="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Day:</label>
                <input type="date" className="form-control" id="exampleFormControlInput1" name="day" required/>
            </div>
            <div class="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Location:</label>
                <input type="text" className="form-control" id="exampleFormControlInput1" name="title" placeholder="Home"/>
            </div>
            <div>
                <div className='mb-3'>
                    <label htmlFor="exampleDataList" className="form-label">Category:</label>
                    <select class="form-control" id="select">
                        <option value="">Type to search...</option>
                        <option value="Lunch">Lunch</option>
                        <option value="Dinner">Dinner</option>
                        <option value="Work">Work</option>
                        <option value="Education">Education</option>
                    </select>
                </div>
                <div class="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Want to add a new category?</label>
                <input type="text" className="form-control input rounded" id="exampleFormControlInput1" name="title" placeholder="Business meeting"/>
                </div>
            </div>
        </form>
    );
}
export default EventForm;