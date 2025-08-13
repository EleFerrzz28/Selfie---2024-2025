import { motion } from "framer-motion";
import "./CloseNoteModal.css"
import { useDeleteNoteMutation } from "../../redux/notes/notesApiSlice";
import { toast } from "react-toastify";

function DeleteNoteModal({ setDeleteNoteModal, id, setOpenMenuId }) {
    const [deleteNote, { isLoading }] = useDeleteNoteMutation();
    const handleDeleteNote = async () => {
        // if (isLoading2) return;
        // if (!window.confirm('Are you sure you want to delete this note?')) {
        //     return;
        // }
        try {
            await deleteNote(id).unwrap();
            setOpenMenuId(null);
            toast.success("Note deleted successfully!");
        } catch (err) {
            console.error('Failed to delete note:', err);
            toast.error("Failed to delete note");
        }
    };

    return (
        <motion.div
            className="modal d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => { setDeleteNoteModal(null); }}>
            <motion.div
                className="modal-dialog modal-sm modal-dialog-centered"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
                
            >
                <div className="modal-content closeModal border-0">
                    <div className="modal-header">
                        <h5 className="modal-title">Delete Note?</h5>
                        <button type="button" className="btn-close" onClick={() => setDeleteNoteModal(null)} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <p>Are you sure you want to delete this note? It will be lost forever!</p>
                    </div>
                    <div className="modal-footer d-flex justify-content-around w-100">
                        <button type="button" id="NDELETE" className="btn" onClick={() => { setDeleteNoteModal(null); }}> No </button>
                        <button type="button" id="YDELETE" className="btn" onClick={(e) => { setDeleteNoteModal(null); handleDeleteNote(e) }}> Yes </button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default DeleteNoteModal;
