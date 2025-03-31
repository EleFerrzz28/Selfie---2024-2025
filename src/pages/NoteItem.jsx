import MainNavbar from "../components/MainNavbar";

import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { use } from "react";

function NoteItem() {
    const { noteID } = useParams();
    console.log(cardID);

    const note = useSelector((state) =>
        state.cities.value.filter((note) => note.id == noteID.toString())
    );
    
    return (
        <h1></h1>
    )
}
export default NoteItem;