import './Activity.css'
import { DateTime } from 'luxon';
import { useState, useRef, useEffect } from 'react';
import { useDeleteActMutation, useGetActQuery, useEditActMutation, useSetCompletedActMutation } from '../../redux/calendar/actApiSlice';
import { toast, ToastContainer } from 'react-toastify';
import { useGetCatQuery } from '../../redux/calendar/catApiSlice';
import 'animate.css';
import { useSelector } from 'react-redux';

function Activity({activities, notifications}){
    const defaultNotification = useSelector(state => state.notification.defaultNotification);
    const timeData = DateTime.fromISO(useSelector((state) => state.time.value)); // TM
    
    const [slideAct, setSlideAct]=useState(0);
    const [actToDelete, setActToDelete]=useState(null);
    const [actToUpdate, setActToUpdate] = useState({});
    const [setCompletedAct] = useSetCompletedActMutation();

    const { data: actData = [], isLoading, refetch } = useGetActQuery();
    const { data: catData = [] } = useGetCatQuery();
    const [deleteAct] = useDeleteActMutation();
    const [editAct] = useEditActMutation();
    const [not, setNot] = useState(defaultNotification);
    const [activitiesArray, setActivitiesArray] = useState([]);

    const categoryMap = catData.reduce((acc, cat) => {
        acc[cat._id] = cat;
        return acc;
    }, {});

    useEffect(() => {
        if (!Array.isArray(actData)) return;
        const arr = actData
            .map((activity, index) => ({ ...activity, localId: `${activity._id}-${index}` }))
            .sort((a, b) => DateTime.fromISO(a.deadline) - DateTime.fromISO(b.deadline));
        setActivitiesArray(arr);
    }, [actData]);

    const sliderRefs = useRef([]);

    const handleSlideChange = (index) => {
      setSlideAct(index);
      const refToScroll = sliderRefs.current[index];
      if (refToScroll) {
        refToScroll.scrollIntoView({ behavior: 'smooth', inline: 'center' });
      }
    };

    const delAct=async(id)=>{
        try {
            await deleteAct(id).unwrap();
            toast.success("Activity deleted successfully!");
            refetch();
        } catch(err) {
            toast.error(err?.data?.message || "Failed to delete activity")
        }
    }

    const handleChangeActivity = (e) => {
        const { name, value } = e.target;
        setActToUpdate(prev => ({ ...prev, [name]: value}));
    };

    const updateAct = async() => {
        if (!actToUpdate._id) {
        toast.error("Error: Missing activity ID");
        return;
        }
        try {
            await editAct(actToUpdate).unwrap();
            toast.success("Activity updated successfully!");
            refetch();
        } catch (err) {
            toast.error(err?.data?.message || "Failed to update the activity.")
        }
    }

    const handleCheckAct = async(actId) => {
        try{
            await setCompletedAct(actId).unwrap();
            toast.success('Activity completed!');
            await refetch();
        } catch(err) {
            toast.error(err?.data?.message || "Failed to complete activity.")
        }
    };

    const today = DateTime.local();
 
    return(
        <>
            <ToastContainer autoClose={3000}/>
            <div className="actContainer d-flex align-items-end mt-3">
                <div className="card bg-transparent border-0">
                    <div className="card-body text-white">
                        <div className='time text-white'>
                            {timeData.toLocaleString(DateTime.DATETIME_MED)}
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="white" className="bi bi-clock-fill ms-3" viewBox="0 0 16 16">
                                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z"/>
                            </svg>
                        </div>
                        <p className='act-title'>Next due dates:</p>
                        <div className='d-flex slider-activity-container mt-3'>
                        {activitiesArray.map((actIt,index)=>{
                            const redAct = DateTime.fromISO(actIt.deadline) < (today.plus({weeks: 1}));
                            const orangeAct = DateTime.fromISO(actIt.deadline) < (today.plus({weeks: 4})) && DateTime.fromISO(actIt.deadline) >= (today.plus({weeks: 1}));
                            return (
                            <div key={index} ref={(el) => sliderRefs.current[index] = el} className={`position-relative rounded p-4 slider-activity m-1 
                            ${index!==slideAct ? "not-main-slider" : "main-slider"} ${actIt.completed ? 'completed-act' : ''}`}>
                                <p>Deadline: {DateTime.fromISO(actIt.deadline).toISODate()}</p>
                                <small>Category: {categoryMap[actIt.category]?.name ?? "-"}</small>
                                <p className="card-title text-uppercase">
                                    {actIt.title}
                                </p>
                                <div className='d-flex justify-content-between pb-3 text-white'>
                                    <small className="button-modMod-act" data-bs-toggle="modal" data-bs-target="#updateModalAct" onClick={()=>setActToUpdate(actIt)}>modify</small>
                                    <small className="button-modDel-act" data-bs-toggle="modal" data-bs-target="#deleteActModal" onClick={()=>setActToDelete(actIt._id)}>delete</small>
                                </div>
                                <p className="card-text pb-2">{actIt.description}</p>
                                <div className='checkbox-container p-1'>
                                    <input className='checkbox' type="checkbox" checked={actIt.completed} onChange={()=>handleCheckAct(actIt._id)}/>
                                    <span className='checkmark rounded'></span>
                                </div>
                                {actIt.completed ? '' : <div className={`position-absolute signal-act rounded-circle d-flex justify-content-center align-items-center fs-6 ${redAct ? 'signal-act-tomato' : (orangeAct ? 'signal-act-gold' : 'signal-act-forestGreen')}`}>!</div>}
                            </div>
                           )})}
                        </div>
                    </div>
                    <div id='changeSlideButtonsAct'>
                        {activitiesArray.map((_, index) => (
                            <input key={index} type="radio" name="toggleAct" checked={index===slideAct} onChange={()=>handleSlideChange(index)}/> 
                        ))}
                    </div>
                </div>
            </div>

            <div className="modal fade text-white" id="deleteActModal" tabIndex="-1" aria-labelledby="deleteActModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content modal-blur rounded border border-white">
                        <div className="modal-body">
                            <p className="m-2">Are you sure you want to delete this activity?</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn buttonClose" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn buttonSave" data-bs-dismiss="modal" onClick={()=>delAct(actToDelete)}>Delete</button>
                        </div>
                    </div>
                </div>
            </div>
             <div className="modal fade text-white" id="updateModalAct" tabIndex="-1" aria-labelledby="updateModalActLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content modal-blur rounded border border-white">
                        <div className="modal-body">
                            <form id="modal-form" method="get" className='was-validated'>
                                <div>
                                    <div className="mb-3">
                                        <label htmlFor="titleAct" className="form-label ">Title:</label>
                                        <input type="text" className="form-control shadow-none border-0"  value={actToUpdate.title ?? ""} onChange={handleChangeActivity} id="titleAct" name="title" required/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="descAct" className="form-label">Description</label>
                                        <textarea className="form-control shadow-none border-0" value={actToUpdate.description ?? ""} onChange={handleChangeActivity} id="descAct" rows="2" name='description'></textarea>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="deadline" className="form-label">Deadline:</label>
                                        <input type="date" className="form-control shadow-none border-0" value={actToUpdate.deadline ? DateTime.fromISO(actToUpdate.deadline).toFormat('yyyy-MM-dd') : ''} onChange={handleChangeActivity} id="deadline" name="deadline" required/>
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor='notAct' className='form-label'>Do you want to change notifications settings for this activity?</label>
                                        {Object.keys(notifications).map((key)=>(
                                            <div key={key}>
                                                <div className="form-check pb-2">
                                                <input className="form-check-input shadow-none border-0 radio-event-form" type="radio" name="notifications" id={key} 
                                                    value= {key} checked={key === not} onChange={(e)=>{handleChangeActivity(e); setNot(e.target.value)}}/>
                                                    <label className="form-check-label text-white" htmlFor={key}>
                                                        {notifications[key]}
                                                    </label>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='mb-3'>
                                        <label htmlFor="catAct" className="form-label">Category:</label>
                                        <select className="form-control shadow-none border-0" name="category" value={actToUpdate.category ?? ""} onChange={handleChangeActivity} id="select">
                                            <option value="">Type to search...</option>
                                            {catData.map((cat)=>(
                                                <>
                                                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                                                </>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn buttonClose" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn buttonSave" data-bs-dismiss="modal" onClick={updateAct}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            {isLoading && <p className='text-light animate__animated animate__bounce h1 animate__infinite animate__slow'>Loading...</p>}
         </>
    );
}
export default Activity