import "./Page.css"
import NotesList from "../components/NotesComponents/NotesList.jsx"
import "../components/NotesComponents/NotesList.css"

import MainNavbar from "../components/MainNavbar.jsx"
import BottomNavbar from "../components/BottomNavbar.jsx"

import useMediaQuery from "../hooks/useMediaQuery.jsx"
import { useState, useEffect } from "react"
import { ToastContainer } from "react-toastify"
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
                <div className="container-fluid justify-content-center" style={{
                    backgroundImage: 'linear-gradient(60deg, var(--sunrise), var(--darkPurple))',
                    transition: 'background-color 0.25s ease-in-out',
                    overflow: 'hidden'
                }}>
                    <ToastContainer />
                    <div className="row" >
                        <div className="p-0 m-0 col-auto">
                            <MainNavbar />
                        </div>
                        <div className="p-0 m-0 col flex-grow-1">
                            <NotesList />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mobile-layout h-100"
                    style={{
                        backgroundImage: 'linear-gradient(60deg, var(--sunrise), var(--darkPurple)',
                        transition: 'background-color 0.25s ease-in-out',
                        overflow: 'hidden'
                    }}>
                    <ToastContainer />
                    <BottomNavbar />
                    <div className="mobilerow row h-100">
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