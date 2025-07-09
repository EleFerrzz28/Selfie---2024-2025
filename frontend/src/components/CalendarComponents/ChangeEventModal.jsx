import "./ChangeEventModal.css"

function ChangeEventModal(){
    return(
        <div className="modal fade" id="staticBackdropChangeEvents" data-bs-backdrop="static" aria-labelledby="staticBackdropLabel" data-bs-keyboard="false" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog  modal-dialog-centered">
                <div className="modal-content border">
                    <div className="modal-header border-0">
                        <div className="modal-title text-light">
                            Change Event
                        </div>
                        <div className="btn btn-close btn-close-white" data-bs-dismiss="modal"></div>
                    </div>
                    <div className='m-3 mt-1'>
                        <div className="list-group">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nemo, nulla?</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ChangeEventModal;