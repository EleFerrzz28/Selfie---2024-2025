import "./Page.css"
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
                            <div className="p-0 m-0 col-lg-10">
                                <NotesList />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mobile-layout">
                    <BottomNavbar/>
                    <div className="mobilerow row">
                        <div className="col-12">
                            <NotesList/>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
 
}

export default Notes