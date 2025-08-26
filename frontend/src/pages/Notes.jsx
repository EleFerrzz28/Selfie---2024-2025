import "./Page.css"
import NotesList from "../components/NotesComponents/NotesList.jsx"
import "../components/NotesComponents/NotesList.css"

import MainNavbar from "../components/MainNavbar.jsx"
import BottomNavbar from "../components/BottomNavbar.jsx"

import useMediaQuery from "../hooks/useMediaQuery.jsx"
import { useState, useEffect } from "react"
import { ToastContainer, Bounce } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

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
                    <ToastContainer />
                    <div className="container-fluid justify-content-center">
                        <div className="row" >
                            <div className="p-0 m-0 col-auto">
                                <MainNavbar />
                            </div>
                            <div className="p-0 m-0 col flex-grow-1">
                                <NotesList /> 
                            </div>
                        </div>
                    </div>
                </div >
            ) : (
                <div className="mobile-layout">
                    <ToastContainer />
                    <BottomNavbar />
                    <div className="mobilerow row">
                        <div className="col-12">
                            <NotesList />
                        </div>
                    </div>
                </div>
            )
            }
        </>
    );

}

export default Notes