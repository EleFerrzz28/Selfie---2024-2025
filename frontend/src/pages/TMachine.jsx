import "./Page.css"
import BottomNavbar from "../components/BottomNavbar.jsx"
import TimeMobile from "../components/TimeMachineComponents/TimeMobile.jsx"

import { useState, useEffect } from "react"
import 'react-toastify/dist/ReactToastify.css';

function Notes() {
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
        setIsReady(true);
    }, []);

    if (!isReady) return null;

    return (
        <>
            <div className="mobile-layout" style={{
                backgroundImage: 'linear-gradient(60deg, var(--sageGreen), rgba(33, 126, 33, 1)',
                transition: 'background-color 0.25s ease-in-out',
                overflow: 'hidden'
            }}>
                <BottomNavbar />
                <div className="row">
                    <div className="col-12">
                        <TimeMobile />
                    </div>
                </div>
            </div>
        </>
    );

}

export default Notes