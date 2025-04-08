import MainNavbar from "../components/MainNavbar";
import BottomNavbar from "../components/BottomNavbar";
import FullNote from "../components/FullNote.jsx";

import useMediaQuery from "../hooks/useMediaQuery.jsx"
import { useState, useEffect } from "react"

function NoteItem() {
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
                                <FullNote />
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="mobile-layout">
                    <BottomNavbar />
                    <div className="row ps-1">
                        <div className="mt-5 pe-1 col-12" style={{ position: "relative" }}>
                            <FullNote />
                        </div>
                    </div>
                </div>
            )}
        </>
    );

}
export default NoteItem;