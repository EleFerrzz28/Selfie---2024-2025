import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {  useEffect } from "react";
import { getAllTags } from "../../redux/notes/selectors";
import "./TagsModal.css"

function TagsModal({ setOpenModal, tagsSelected, setTagsSelected }) {
    const tags = useSelector(getAllTags);

    function selectTag(tag) {
        if (tagsSelected.includes(tag)) setTagsSelected(tagsSelected.filter(t => t !== tag));
        else setTagsSelected([...tagsSelected, tag]);
    }

    useEffect(() => {
        console.log("Tags selezionati aggiornati:", tagsSelected);
    }, [tagsSelected]);

    return (
        <motion.div
            className="modal d-block"
            tabIndex="-1"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}>
            <motion.div
                className="modal-dialog modal-dialog-centered"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
                style={{ width: "65vmin" }}>
                <div className="modal-content border-0 tagsModal">
                    <div className="modal-header border-bottom">
                        <h5 className="modal-title"><i>Choose Tags</i> :</h5>
                        <button type="button" className="btn-close" onClick={() => setOpenModal(false)} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div id="tagList" className="d-flex p-0 m-0 flex-wrap justify-content-around align-items-center flex-row">
                            {tags.map((tag, index) => (
                                <div key={index} className={`tagListStyle m-1 p-2 rounded ${tagsSelected.includes(tag) ? 'isSelected' : ''}`}
                                    onClick={() => selectTag(tag)}>{tag}</div>
                            ))}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" style = {{backgroundColor: "var(--herb)", color: "white", transition: "0.4s"}} className="btn w-100" onClick={() => { setTagsSelected([]) }}>Undo Selection</button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default TagsModal;
