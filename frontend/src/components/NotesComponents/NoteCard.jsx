import { motion } from "framer-motion";
import "./NoteCard.css"
import "./NotePreviewCard.css"

function NoteCard({ setPreviewNoteModal, id, title, desc, tags, creation_date, last_update_date }) {
    return (
        <motion.div
            className="modal d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { setPreviewNoteModal(null); e.stopPropagation() }}>
            <motion.div
                className="modal-dialog modal-lg modal-dialog-centered"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
            >
                <div className="modal-content mcNoteCard border-0">
                    <div className="modal-header border-bottom">
                        <h5 className="modal-title">{title}</h5>
                        <button type="button" className="btn-close" onClick={() => { setPreviewNoteModal(null) }} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div id="noteCardtext" className="p-1"><p>{desc}</p></div>
                    </div>
                    <div className="row p-3 pb-0 mb-0 pt-1" >
                        {
                            tags.map((tag, index) => (
                                <h6 key={index} className="tagStyle card-subtitle shadow rounded mb-2 ms-2 p-1 text-muted">{tag}</h6>
                            ))
                        }
                    </div>
                    <div className="modal-footer d-flex justify-content-start">
                        <p className="w-100 mb-0"><i>Created on date: {new Intl.DateTimeFormat('en-US').format(new Date(creation_date))}</i></p>
                        <p><i>Last updated on date: {new Intl.DateTimeFormat('en-US').format(new Date(last_update_date))}</i></p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default NoteCard;
