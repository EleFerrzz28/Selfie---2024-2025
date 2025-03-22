import "./NotePreviewCard.css";

function NotePreviewCard({ title, text, tags }) {
    const maxLength = 200;
    var truncated = "";

    const truncateText = () => {
        if(text.length > maxLength){
            truncated = text.substr(0,maxLength) + "...";
        }
    }
    truncateText();
    return (
        <div className="card previewNota shadow rounded p-3 mb-3">
            <div className="cardHeading d-flex justify-content-between align-items-center p-1">
                <h5 className="card-title"><strong>{title}</strong></h5>
                <div className="dropdown d-flex">
                    {/* inserisci kebab menu */}
                </div>
            </div>
            <div className="container-fluid p-1">
                <div className="row">
                    {
                        tags.map((tag) => (
                            <h6 id = "tagStyle" className="card-subtitle rounded mb-2 ms-2 p-1 text-muted">{tag}</h6>
                        ))
                    }
                </div>
                <p className="card-text">{truncated}</p>
            </div>
        </div>
    );
}
export default NotePreviewCard;