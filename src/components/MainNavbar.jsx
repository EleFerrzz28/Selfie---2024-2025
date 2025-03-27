import "./MainNavbar.css"
import {useState} from "react"

function MainNavbar() {
    const [sidebarState, setSidebarState] = useState(true);

    return (
        <nav id="sidebar" className = {`${!sidebarState && "close"} pt-3`}>
            <ul>
                <li className = "mb-5 pt-2 d-flex justify-content-end">
                    <span className="logo" style = {{display : sidebarState ? "block" : "none"}}>SELFIE</span>
                    <button id="toggle-btn" className = "me-2" onClick = {() => setSidebarState(!sidebarState)} style ={{transform : sidebarState ? "rotate(180deg)" : "rotate(0deg)" }}>
                        <svg xmlns="http://www.w3.org/2000/svg" fillRule="currentColor" className="bi bi-chevron-double-right" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708" />
                            <path fillRule="evenodd" d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708" />
                        </svg>
                    </button>
                </li>
                <li className="active">
                    <a href="home.html" className = "p-2 mb-3 me-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fillRule="currentColor" className="bi bi-house" viewBox="0 0 16 16">
                            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z" />
                        </svg>
                        <span>Home</span>
                    </a>
                </li>
                <li>
                    <a href="calendar.html" className = "p-2 mb-3 me-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fillRule="currentColor" className="bi bi-calendar" viewBox="0 0 16 16">
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                        </svg>
                        <span>Calendar</span>
                    </a>
                </li>
                <li>
                    <a href="notes.html" className = "p-2 mb-3 me-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fillRule="currentColor" className="bi bi-journal-text" viewBox="0 0 16 16">
                            <path d="M5 10.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5" />
                            <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2" />
                            <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1z" />
                        </svg>
                        <span>Notes</span>
                    </a>
                </li>
                <li>
                    <a href="pomodoro.html" className = "p-2 mb-5 me-1">
                        <svg xmlns="http://www.w3.org/2000/svg"  fillRule="currentColor" className="bi bi-egg-fried" viewBox="0 0 16 16">
                            <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                            <path d="M13.997 5.17a5 5 0 0 0-8.101-4.09A5 5 0 0 0 1.28 9.342a5 5 0 0 0 8.336 5.109 3.5 3.5 0 0 0 5.201-4.065 3.001 3.001 0 0 0-.822-5.216zm-1-.034a1 1 0 0 0 .668.977 2.001 2.001 0 0 1 .547 3.478 1 1 0 0 0-.341 1.113 2.5 2.5 0 0 1-3.715 2.905 1 1 0 0 0-1.262.152 4 4 0 0 1-6.67-4.087 1 1 0 0 0-.2-1 4 4 0 0 1 3.693-6.61 1 1 0 0 0 .8-.2 4 4 0 0 1 6.48 3.273z" />
                        </svg>
                        <span>Pomodoro</span>
                    </a>
                </li>
                <li>
                    <a href="notifics.html" className = "p-2 mb-3 me-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fillRule="currentColor" className="bi bi-bell" viewBox="0 0 16 16">
                            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6" />
                        </svg>
                        <span>Notifications</span>
                    </a>
                </li>
                <li>
                    <a href="settings.html" className = "p-2 mb-3 me-1">
                        <svg xmlns="http://www.w3.org/2000/svg" fillRule="currentColor" className="bi bi-gear" viewBox="0 0 16 16">
                            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492M5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0" />
                            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115z" />
                        </svg>
                        <span>Settings</span>
                    </a>
                </li>
                <li>
                    <a href="user.html" className = "p-2 mb-2">
                        <img className="avatar m-0 p-0" src="data:image/jpeg;base64,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"></img>
                        <span>User</span>
                    </a>
                </li>
            </ul>
        </nav>
    )
}

export default MainNavbar

// import "./MainNavbar.css"
// import gearFill from "../assets/gear-fill.svg"
// import bellFill from "../assets/bell-fill.svg"
// import logo from "../assets/logo.svg"

// function MainNavbar({ numNotif }) {
//     const userName = "RobbyGoro" // aggiungi il "Welcome {userName}"
//     const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');

//     return (
//         <nav id ="mainNavbar" className="navbar navbar-expand-lg bg-light">
//             <div className="container-fluid d-flex justify-content-between">
//                 <a id="logo" className="navbar-brand mb-0 h1 p-0" href="#">
//                     <img src = {logo} id = "logo"/>
//                 </a>
//                 <a className="nav-link active px-3" id="userImage" aria-current="page"
//                     data-bs-toggle="tooltip" data-bs-placement="bottom"
//                     data-bs-custom-class="custom-tooltip"
//                     data-bs-title="User Settings">
//                     <img className="avatar" src="data:image/jpeg;base64,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"></img>
//                 </a>
//                 <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-expanded="false" aria-label="Toggle navigation">
//                     <span className="navbar-toggler-icon"></span>
//                 </button>
//                 <div className="offcanvas offcanvas-start bg-opacity-10" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
//                     <div className="offcanvas-header">
//                         <h5 className="offcanvas-title" id="offcanvasNavbarLabel">SELFIE</h5>
//                         <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
//                     </div>
//                     <div className="offcanvas-body" id="navbarSupportedContent">
//                         <ul className="navbar-nav mb-2 mb-lg-0 ">
//                             <li className="nav-item">
//                                 <a className="nav-link active" aria-current="page" href="#">Home</a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link" href="calendar.html">Calendar</a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link" href="pomodoro.html">Pomodoro</a>
//                             </li>
//                             <li className="nav-item">
//                                 <a className="nav-link" href="notes.html">Notes</a>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//                 <div className="d-flex gap-3">
//                     {/* <div className="search">
//                         <input type ="text" placeholder = "search" className="nav-link p-2 search_input"/>
//                         <button type = "submit"><img id="search" src={search} /></button>
//                     </div> */}
//                     <a className="nav-link active p-2" href="#">
//                         <img id="settings" src={gearFill} />
//                     </a>
//                     <a className="nav-link active p-2" href="#">
//                         <div className="position-relative d-inline-block">
//                             <img id="notif" src={bellFill} />
//                             {numNotif > 0 && <span className="position-absolute top-0 start-100 p-1 translate-middle badge rounded-pill bg-danger">
//                                 +{numNotif}
//                             </span>}
//                         </div>
//                     </a>
//                 </div>
//             </div>
//         </nav>

//     );
// }

// export default MainNavbar;