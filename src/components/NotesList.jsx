import "./NotesList.css";
import NotePreviewCard from "../components/NotePreviewCard.jsx"
import { useState, useEffect } from "react"

function NotesList() {
    const [notesList, setNotesList] = useState([
        {
            id: 0,
            title: "Operating Systems",
            text: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate saepe tenetur magnam libero nobis repellat sint numquam molestias illo nemo aliquam quia ratione fuga totam, alias culpa, placeat animi provident! Incidunt commodi omnis quas mollitia dignissimos excepturi est id, corrupti dolorem accusamus cupiditate provident ipsum, odio maiores? Dolores voluptatibus officiis tempora illum at suscipit iste fugit eos hic animi culpa asperiores dolore sapiente accusantium atque, rerum aperiam quas vel pariatur, eligendi sit quisquam. Placeat dolore, enim, itaque velit fugiat doloremque aut voluptatibus, neque deleniti excepturi exercitationem perferendis id quasi!",
            tags: ["university", "exams"]
        },
        {
            id: 1,
            title: "Ricetta Crostini con Salsicce",
            text: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione veniam odit iusto unde laboriosam perferendis suscipit minima, animi optio aliquid qui nulla saepe magnam inventore rerum. Temporibus architecto libero eum aperiam delectus? Deserunt est officia harum, ipsa consequatur molestias blanditiis nemo asperiores quisquam tempora magni maiores dolor illo perferendis in.
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum rerum illum expedita consequuntur, ipsum numquam placeat voluptatum laborum magni sapiente quibusdam vel nihil harum reprehenderit soluta nemo accusamus doloremque a quis mollitia odio non, minima adipisci. Suscipit, natus nesciunt corrupti repellendus voluptatem laudantium, optio temporibus at neque animi praesentium illum asperiores? Reprehenderit at repellat maxime laborum rerum. Tempore, delectus. Distinctio ad dolorum autem necessitatibus ab, praesentium ullam debitis molestias officiis quas a, fuga repudiandae. Eius pariatur ut autem ducimus perferendis?`,
            tags: ["kitchen", "snacks"]
        },
        {
            id: 2,
            title: "Compiti Sabato",
            text: "Cupiditate saepe tenetur magnam libero nobis repellat sint numquam molestias illo nemo aliquam quia ratione fuga totam, alias culpa, placeat animi provident! Incidunt commodi omnis quas mollitia dignissimos excepturi est id, corrupti dolorem accusamus cupiditate provident ipsum, odio maiores? Dolores voluptatibus officiis tempora illum at suscipit iste fugit eos hic animi culpa asperiores dolore sapiente accusantium atque, rerum aperiam quas vel pariatur, eligendi sit quisquam. Placeat dolore, enim, itaque velit fugiat doloremque aut voluptatibus, neque deleniti excepturi exercitationem perferendis id quasi!",
            tags: ["homeworks"]
        },
        {
            id: 3,
            title: "Dream",
            text: "Odio maiores? Dolores voluptatibus officiis tempora illum at suscipit iste fugit eos hic animi culpa asperiores dolore sapiente accusantium atque, rerum aperiam quas vel pariatur, eligendi sit quisquam. Placeat dolore, enim, itaque velit fugiat doloremque aut voluptatibus, neque deleniti excepturi exercitationem perferendis id quasi!",
            tags: ["diary", "Freud"]
        },
        {
            id: 4,
            title: "Ottimizzazione Veneta",
            text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, repellat et ipsam officia minima aliquid animi, cupiditate accusamus magnam modi error placeat ea. Esse sit quo delectus odio architecto placeat reprehenderit enim consequatur. Tempora iste cum in temporibus nam iure suscipit natus aut asperiores, dolores perferendis ipsum ad officiis nesciunt repellat, inventore sit quasi. Possimus laboriosam libero sunt alias ab sit rerum quibusdam, quasi dolorum provident laudantium? Saepe tempore in numquam fuga quasi dolores veritatis delectus perferendis, consectetur blanditiis sint repudiandae ipsam veniam deserunt rem et error omnis quas esse asperiores aspernatur dolorem non. Omnis harum, dolor ea, similique mollitia repellat non neque provident illo alias vitae quo sit nam accusamus. Id ipsum quasi, quisquam inventore maiores dicta reprehenderit autem nulla minima in? Qui, saepe ea! Vel, maxime dolores necessitatibus odit accusantium explicabo soluta ratione vitae perspiciatis officia quo aperiam nobis voluptate iusto! Tempora laborum impedit placeat ducimus doloribus dolore minima quia laboriosam eum eveniet delectus veniam esse molestias cupiditate eius non, consectetur harum animi. Doloremque, optio? Ab necessitatibus eaque culpa quisquam maxime, harum, libero dolore laudantium perferendis, at molestias! Nesciunt eveniet perferendis impedit excepturi dolore obcaecati quo esse quod, accusantium vitae soluta ut. Eligendi provident facilis eum. Iste non aspernatur explicabo doloremque quaerat laboriosam, tenetur temporibus voluptate exercitationem modi soluta. Illo necessitatibus, minus est laborum modi dolores dolorem totam voluptatibus impedit id! Aliquid obcaecati, sint eius corrupti nesciunt magni praesentium illo, quasi animi sunt accusamus ratione quo aperiam nostrum nisi? Quisquam doloremque, distinctio assumenda quia eaque dolorum quam vitae voluptas. Esse quos, asperiores id iste magnam quis omnis soluta perferendis, sequi error placeat magni, vitae excepturi laudantium aliquam dignissimos! Exercitationem optio libero culpa, sequi earum excepturi, rerum, debitis doloribus possimus voluptatem repellat eius maxime esse similique asperiores! Perspiciatis aliquid ex, adipisci commodi maxime dolorum assumenda eum, sint voluptas necessitatibus unde quam, quaerat repellat soluta. Sequi nihil incidunt vel iste, ea, libero debitis repellat cupiditate tempora nam eos aspernatur? Obcaecati iusto natus nam repellendus nisi possimus eaque laborum cumque doloribus facere nostrum, dolorem labore hic officiis? Dolor numquam aperiam, possimus atque labore suscipit soluta commodi rem tenetur fugit mollitia aspernatur placeat earum eos magnam alias ipsum ullam vero dolorem doloribus temporibus voluptas libero porro. Repellat, sequi aperiam. Vitae omnis, magni ducimus quo consequatur quas eligendi sapiente eum ipsa qui facilis asperiores, error quos adipisci dolorum beatae ipsam nam! Expedita unde blanditiis ducimus possimus. Labore alias esse ullam molestias magnam tempore.",
            tags: ["veneto", "zagato", "flussi"]
        },
    ]);

    /*FUNCTION TO ADD RE-RENDER THE NOTESLIST*/
    const addNote = (note) => {
        setNotesList([...notesList, note]);
    };

    const useWindowWidth = () => {
        const [windowWidth, setWindowWidth] = useState(window.innerWidth);

        useEffect(() => {
            const handleResize = () => setWindowWidth(window.innerWidth);
            window.addEventListener("resize", handleResize);
            return () => window.removeEventListener("resize", handleResize);
        }, []);

        return windowWidth;
    };

    const windowWidth = useWindowWidth();

    return (
        <div className="card mt-2">
            <div className="cardHeading d-flex justify-content-between align-items-center p-1" style={{ borderBottom: "solid 1px rgb(192, 192, 192)" }}>
                <h5 className="card-title px-3 pt-2 pb-1 mb-0"> All Notes</h5>
                <div className="d-flex p-1">
                    <form className="pe-1 d-flex" role="search">
                        <input className="searchNote form-control me-2" type="search" placeholder="Search Note..." aria-label="Search" />
                        <button id="searchButton" className="btn" type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" id="searchIcon" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                            </svg>
                        </button>
                    </form>
                    <div className="dropdown ms-1">
                        <button className="btn dropdown-toggle orderButton me-1" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            <svg xmlns="http://www.w3.org/2000/svg" id="orderIcon" fill="currentColor" className="bi bi-list-ul" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5m-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2m0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                            </svg>
                        </button>
                        <ul className="dropdown-menu">
                            <li><button className="dropdown-item" type="button">Alphabetical Order</button></li>
                            <li><button className="dropdown-item" type="button">Date Order</button></li>
                            <li><button className="dropdown-item" type="button">Length Order</button></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="card-body p-0">
                <div data-spy="scroll" data-target="#noteList" data-offset="50" style={{ maxHeight: windowWidth > 991 ? "71vmin" : "none", overflowY: windowWidth > 991 ? "auto" : "none" }}>
                    <div id="noteList" className="card-body ps-3 mt-0">
                        {notesList.map((note) => (
                            <div className="p-1" key={note.id}>
                                    <NotePreviewCard
                                        title={note.title}
                                        text={note.text} 
                                        tags={note.tags} />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NotesList;