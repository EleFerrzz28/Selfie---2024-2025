import "./Notes.css"
import NewNoteCard from "../components/NotesComponents/NewNoteCard.jsx"
import NotesList from "../components/NotesComponents/NotesList.jsx"

import MainNavbar from "../components/MainNavbar.jsx"
import BottomNavbar from "../components/BottomNavbar.jsx"

import useMediaQuery from "../hooks/useMediaQuery.jsx"
import { useState, useEffect } from "react"

function Notes() {
    const [isReady, setIsReady] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 960px)");

    useEffect(() => {
        setIsReady(true);
    }, []);

    if (!isReady) return null;

    return (
        <>
            {isDesktop ? (
                <div className="container-fluid p-0 m-0">
                    <div className="container-fluid justify-content-center">
                        <div className="row">
                            <div className="p-0 m-0 col-lg-2">
                                <MainNavbar />
                            </div>
                            <div className="pe-0 m-0 col-lg-4">
                                <NewNoteCard />
                            </div>
                            <div className="pe-1 col-lg-6">
                                <NotesList  />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mobile-layout">
                    <BottomNavbar />
                    <div className="row ps-1">
                        <div className="mt-5 pe-1 col-12" style = {{position: "relative"}}>
                            <NewNoteCard />
                        </div>
                        <div className="pe-1 mb-5 col-12">
                            <NotesList/>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
 
}

export default Notes