import './EventForm.css'
function EventForm(){
    return(
        <form id="modal-form" method="get" className='was-validated'>
            <div>
                <label>Title: </label><br/>
                <input className="input rounded" type="text" name="title" placeholder="Business meeting" required/>
                <div className="valid-feedback text-light">Thank you!</div>
                <div className="invalid-feedback text-light">This field is required.</div>
            </div>
            <div className="mt-2">
                <label>Description: </label><br/>
                <textarea className="input rounded" type="text" name="description"></textarea>
            </div>
            <div className="mt-2">
                <label>Time: </label><br/>
                <input className="input rounded" type="time" name="time" required/>
            </div>
            <div className="mt-2">
                <label>Day: </label><br/>
                <input className="input rounded" type="date" name="day" required/>
            </div>
            <div className="mt-2">
                <label>Location: </label><br/>
                <input className="input rounded" type="text" name="loc"/>
            </div>
            <div className="mt-2">
                <label for="cat">Category: </label><br/>
                <select className="input rounded" name="cat">
                    <option value="">--select one--</option>
                    <option value="lunch">Lunch</option>
                    <option value="dinner">Dinner</option>
                    <option value="work">Work</option>
                    <option value="ed">Education</option>
                </select>
                <p className="mt-2">Want to add a new category?</p>
                <input className="input rounded"/>
            </div>
        </form>
    );
}
export default EventForm;