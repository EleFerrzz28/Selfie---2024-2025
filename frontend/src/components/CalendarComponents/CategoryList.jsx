import "./CategoryList.css"
import { useAddCatMutation, useDeleteCatMutation, useGetCatQuery, useModifyCatMutation } from '../../redux/calendar/catApiSlice';
import { useGetEventsQuery } from "../../redux/calendar/eventsApiSlice";
import { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import { DateTime } from "luxon";

function CategoryList(){
    const [newCat, setNewCat] = useState('');
    const [newCatColor, setNewCatColor] = useState('#f4a258ff');
    const [catToModify, setCatToModify] = useState({});

    const {data: catData=[], isLoading, isError, refetch: refetch } = useGetCatQuery();
    const {data: eventData = []} = useGetEventsQuery();
    const [addCat] = useAddCatMutation();
    const [deleteCat] = useDeleteCatMutation();
    const [modifyCat] = useModifyCatMutation();

     const addCategory=async()=>{
        try {
            await addCat({
                name: newCat,
                color: newCatColor
            }).unwrap();
            refetch();
            setNewCat('');
            setNewCatColor('#f4a258ff');
        } catch (err) {
            console.error(err);
        }
    }

    const delCat=async(id)=>{
        try {
            await deleteCat(id).unwrap();
            toast.success("Category deleted successfully!");
            refetch();
        } catch(err) {
            toast.error(err?.data?.message || "Failed to delete category")
        }
    }

    const handleChangeCat = (e) => {
        const { name, value } = e.target;
        setCatToModify(prev => ({ ...prev, [name]: value}));
    };

    const updateCat = async() => {
        if (!catToModify._id) {
            toast.error("Error: Missing category ID");
            return;
        }
        try {
            await modifyCat({
                id: catToModify._id,
                name: catToModify.name,
                color: catToModify.color
            }).unwrap();
            toast.success("Category updated successfully!");
            refetch();
            setCatToModify({});
        } catch (err) {
            toast.error(err?.data?.message || "Failed to update the c.")
        }
    }

    return(
        <>
            <ToastContainer/>
            <div className="modal fade" id="categoryList" tabIndex="-1" aria-labelledby="exampleModalLabel"
                aria-hidden="true">
                <div  className=" modal-dialog modal-dialog-centered">
                    <div  id="modal-window" className="modal-content border text-white">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Categories</h1>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <h4>Categories list:</h4>
                            <ul className="listCat list-group">
                                {catData.map((cat)=>(
                                    <li className="bg-transparent text-light list-group-item d-flex align-items-center" key={cat._id} value={cat._id}>
                                        <p>{cat.name}</p>
                                        <div className="ms-3" style={{width:"5mm", height:"5mm", backgroundColor:`${cat.color}`}}></div>
                                        <svg onClick={()=>setCatToModify(cat)} data-bs-toggle="modal" data-bs-target="#modalChangeCategory" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="pen-edit-icon bi bi-pencil" viewBox="0 0 16 16">
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325"/>
                                        </svg>
                                        <svg onClick={()=>delCat(cat._id)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="trash-del-icon bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                                        </svg>
                                    </li>
                                ))}
                            </ul>
                            <hr></hr>
                            <form>
                                <div className="mt-3">
                                    <label htmlFor="newCatEvent" className="form-label">Want to add a new category?</label>
                                    <input type="text" className="form-control input rounded shadow-none border-0" id="newCatEvent" name="category" placeholder="Business meeting" value={newCat} onChange={(e) => setNewCat(e.target.value)}/>
                                    <label htmlFor='selColor' className="mt-3">Select a color:</label>
                                    <input type='color' className='m-3 form-control form-control-color' id ="selColor" name="color" value={newCatColor} onChange={(e) => setNewCatColor(e.target.value)}/><br/>
                                    <button type='button' className='btn text-light border' onClick={addCategory}>Add category</button>
                                </div>
                            </form>
                            <hr></hr>
                            <div className="mt-3">
                                <h4>All events for each Category</h4>
                                {catData.map((cat)=>{
                                    const filtered=(eventData.filter(event => event.category === cat._id))
                                    return (<div key={cat._id}>
                                        <h5>{cat.name}</h5>
                                        <ul className="list-event-category">
                                            {filtered.length>0 ? 
                                            filtered.map((ev)=>(
                                                <li key={ev._id}>{ev.title} ({!ev.endDay ? `${DateTime.fromISO(ev.day).toFormat('yyyy-MM-dd')}` : `${DateTime.fromISO(ev.day).toFormat('yyyy-MM-dd')} - ${DateTime.fromISO(ev.endDay).toFormat('yyyy-MM-dd')}`})</li>
                                            )) :  (<p>There is no event for this category.</p>)}
                                        </ul>
                                    </div>)
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal fade" aria-hidden="true" aria-labelledby="staticBackdropLabel" tabIndex="-1" id="modalChangeCategory">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content border bg-transparent text-light">
                        <div className="modal-header border-bottom">
                            <h5 className="modal-title">Edit category</h5>
                            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <label htmlFor="cat" className="form-label">Category name:</label>
                                <input type="text" className="form-control input rounded shadow-none" id="cat" name="name"  value={catToModify.name ? catToModify.name : ''} onChange={handleChangeCat}/>
                                <label htmlFor='color' className="mt-3">Select a color:</label>
                                <input type='color' className='m-3 form-control form-control-color' id ="color" name="color" value={catToModify.color ? catToModify.color : '#ffffff'} onChange={handleChangeCat}/>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" style={{backgroundColor:'var(--lightBlue)'}} data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" style={{backgroundColor:'var(--celeste)'}} onClick={updateCat} data-bs-dismiss="modal">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CategoryList;