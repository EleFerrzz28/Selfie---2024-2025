import "./ChangeView.css"

function ChangeView({setBigView, open, setOpen}){
    return(
        <div className="bottom-preview-container text-white">
            <div
            className={`modal-preview-select-struct border ${open ? "open" : ""} shadow rounded`}
            onClick={() => setOpen(!open)}
            >
            <div className="d-flex justify-content-between align-items-center p-3 border-0">
                <h5 className="mb-0">Change view</h5>
                <small>
                {open ? "Close" : "Open"}
                </small>
            </div>

            {open && (
                <div className="modal-body p-3 d-flex flex-column border-top">
                    <img src="view-1.svg" alt="view-1" onClick={()=>setBigView(false)} className="mb-4"></img>
                    <img src="view-2.svg" alt="view-2" onClick={()=>setBigView(true)}></img>
                </div>
            )}
            </div>
        </div>
    );
}

export default ChangeView;