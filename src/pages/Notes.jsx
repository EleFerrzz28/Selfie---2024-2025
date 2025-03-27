import "./Notes.css"
import NewNoteCard from "../components/NewNoteCard.jsx"
import NotesList from "../components/NotesList.jsx"
import { useState } from "react"

function Notes() {
    const [notesList, setNotesList] = useState([
        {
            id: 0,
            title: "Operating Systems",
            desc: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Cupiditate saepe tenetur magnam libero nobis repellat sint numquam molestias illo nemo aliquam quia ratione fuga totam, alias culpa, placeat animi provident! Incidunt commodi omnis quas mollitia dignissimos excepturi est id, corrupti dolorem accusamus cupiditate provident ipsum, odio maiores? Dolores voluptatibus officiis tempora illum at suscipit iste fugit eos hic animi culpa asperiores dolore sapiente accusantium atque, rerum aperiam quas vel pariatur, eligendi sit quisquam. Placeat dolore, enim, itaque velit fugiat doloremque aut voluptatibus, neque deleniti excepturi exercitationem perferendis id quasi!",
            tags: ["university", "exams"],
            date: "October 12 2025"
        },
        {
            id: 1,
            title: "Ricetta Crostini con Salsicce",
            desc: `Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione veniam odit iusto unde laboriosam perferendis suscipit minima, animi optio aliquid qui nulla saepe magnam inventore rerum. Temporibus architecto libero eum aperiam delectus? Deserunt est officia harum, ipsa consequatur molestias blanditiis nemo asperiores quisquam tempora magni maiores dolor illo perferendis in.
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nostrum rerum illum expedita consequuntur, ipsum numquam placeat voluptatum laborum magni sapiente quibusdam vel nihil harum reprehenderit soluta nemo accusamus doloremque a quis mollitia odio non, minima adipisci. Suscipit, natus nesciunt corrupti repellendus voluptatem laudantium, optio temporibus at neque animi praesentium illum asperiores? Reprehenderit at repellat maxime laborum rerum. Tempore, delectus. Distinctio ad dolorum autem necessitatibus ab, praesentium ullam debitis molestias officiis quas a, fuga repudiandae. Eius pariatur ut autem ducimus perferendis?`,
            tags: ["kitchen", "snacks"],
            date: "April 17 24"
        },
        {
            id: 2,
            title: "Compiti Sabato",
            desc: "Cupiditate saepe tenetur magnam libero nobis repellat sint numquam molestias illo nemo aliquam quia ratione fuga totam, alias culpa, placeat animi provident! Incidunt commodi omnis quas mollitia dignissimos excepturi est id, corrupti dolorem accusamus cupiditate provident ipsum, odio maiores? Dolores voluptatibus officiis tempora illum at suscipit iste fugit eos hic animi culpa asperiores dolore sapiente accusantium atque, rerum aperiam quas vel pariatur, eligendi sit quisquam. Placeat dolore, enim, itaque velit fugiat doloremque aut voluptatibus, neque deleniti excepturi exercitationem perferendis id quasi!",
            tags: ["homeworks"],
            date: "August 19 2025"
        },
        {
            id: 3,
            title: "Dream",
            desc: "Odio maiores? Dolores voluptatibus officiis tempora illum at suscipit iste fugit eos hic animi culpa asperiores dolore sapiente accusantium atque, rerum aperiam quas vel pariatur, eligendi sit quisquam. Placeat dolore, enim, itaque velit fugiat doloremque aut voluptatibus, neque deleniti excepturi exercitationem perferendis id quasi!",
            tags: ["diary", "Freud"],
            date: "May 10 2024"
        },
        {
            id: 4,
            title: "Ottimizzazione Veneta",
            desc: "Lorem SIGMA BOY ipsum dolor sit amet consectetur adipisicing elit. Dolor, repellat et ipsam officia minima aliquid animi, cupiditate accusamus magnam modi error placeat ea. Esse sit quo delectus odio architecto placeat reprehenderit enim consequatur. Tempora iste cum in temporibus nam iure suscipit natus aut asperiores, dolores perferendis ipsum ad officiis nesciunt repellat, inventore sit quasi. Possimus laboriosam libero sunt alias ab sit rerum quibusdam, quasi dolorum provident laudantium? Saepe tempore in numquam fuga quasi dolores veritatis delectus perferendis, consectetur blanditiis sint repudiandae ipsam veniam deserunt rem et error omnis quas esse asperiores aspernatur dolorem non. Omnis harum, dolor ea, similique mollitia repellat non neque provident illo alias vitae quo sit nam accusamus. Id ipsum quasi, quisquam inventore maiores dicta reprehenderit autem nulla minima in? Qui, saepe ea! Vel, maxime dolores necessitatibus odit accusantium explicabo soluta ratione vitae perspiciatis officia quo aperiam nobis voluptate iusto! Tempora laborum impedit placeat ducimus doloribus dolore minima quia laboriosam eum eveniet delectus veniam esse molestias cupiditate eius non, consectetur harum animi. Doloremque, optio? Ab necessitatibus eaque culpa quisquam maxime, harum, libero dolore laudantium perferendis, at molestias! Nesciunt eveniet perferendis impedit excepturi dolore obcaecati quo esse quod, accusantium vitae soluta ut. Eligendi provident facilis eum. Iste non aspernatur explicabo doloremque quaerat laboriosam, tenetur temporibus voluptate exercitationem modi soluta. Illo necessitatibus, minus est laborum modi dolores dolorem totam voluptatibus impedit id! Aliquid obcaecati, sint eius corrupti nesciunt magni praesentium illo, quasi animi sunt accusamus ratione quo aperiam nostrum nisi? Quisquam doloremque, distinctio assumenda quia eaque dolorum quam vitae voluptas. Esse quos, asperiores id iste magnam quis omnis soluta perferendis, sequi error placeat magni, vitae excepturi laudantium aliquam dignissimos! Exercitationem optio libero culpa, sequi earum excepturi, rerum, debitis doloribus possimus voluptatem repellat eius maxime esse similique asperiores! Perspiciatis aliquid ex, adipisci commodi maxime dolorum assumenda eum, sint voluptas necessitatibus unde quam, quaerat repellat soluta. Sequi nihil incidunt vel iste, ea, libero debitis repellat cupiditate tempora nam eos aspernatur? Obcaecati iusto natus nam repellendus nisi possimus eaque laborum cumque doloribus facere nostrum, dolorem labore hic officiis? Dolor numquam aperiam, possimus atque labore suscipit soluta commodi rem tenetur fugit mollitia aspernatur placeat earum eos magnam alias ipsum ullam vero dolorem doloribus temporibus voluptas libero porro. Repellat, sequi aperiam. Vitae omnis, magni ducimus quo consequatur quas eligendi sapiente eum ipsa qui facilis asperiores, error quos adipisci dolorum beatae ipsam nam! Expedita unde blanditiis ducimus possimus. Labore alias esse ullam molestias magnam tempore.",
            tags: ["veneto", "zagato", "flussi"],
            date: "March 09 2023"
        },
    ]);
    /*FUNCTION TO ADD RE-RENDER THE NOTESLIST*/
    const addNote = (note) => {
        setNotesList([...notesList, note]);
    };

    return (
        <div className="container-fluid justify-content-center">
            <div className="row">
                <div className="col-lg-5 col-12">
                    <NewNoteCard addNote={addNote} />
                </div>
                <div className="col-lg-7 col-12">
                    <NotesList 
                    notesList={notesList}
                    setNotesList={setNotesList} />
                </div>
            </div>
        </div>
    );
}

export default Notes