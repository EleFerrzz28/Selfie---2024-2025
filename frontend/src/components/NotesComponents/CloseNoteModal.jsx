import { motion } from "framer-motion";
import "./CloseNoteModal.css"

function CloseNoteModal({ setOpenModal, handleSubmit, onClose }) {
    return (
        <motion.div
            className="modal d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)"}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <motion.div
                className="modal-dialog modal-sm modal-dialog-centered"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
               >
                <div className="modal-content border-0">
                    <div className="modal-header">
                        <h5 className = "modal-title">Save changes?</h5>
                        <button type="button" className="btn-close" onClick={() => setOpenModal(false)} aria-label="Close"></button>
                    </div>
                    <div className = "modal-body">
                        <p>You're going back to rapid note mode: do you wish to dismiss the changes you've done?</p>
                    </div>
                    <div className="modal-footer d-flex justify-content-around w-100">
                        <button type="button" id = "dismissChanges" className="btn" onClick={() => { setOpenModal(false); onClose(); }}> Dismiss Changes </button>
                        <button type="button" id = "saveChanges" className="btn" onClick={(e) => {setOpenModal(false); handleSubmit(e)}}>Save</button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default CloseNoteModal;
