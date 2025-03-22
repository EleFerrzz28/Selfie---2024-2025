import "./MainNavbar.css"
import gearFill from "../assets/gear-fill.svg"
import bellFill from "../assets/bell-fill.svg"
import logo from "../assets/logo.svg"

function MainNavbar({ numNotif }) {
    const userName = "RobbyGoro" // aggiungi il "Welcome {userName}"
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');

    return (
        <nav id ="mainNavbar" className="navbar navbar-expand-lg bg-light">
            <div className="container-fluid d-flex justify-content-between">
                <a id="logo" className="navbar-brand mb-0 h1 p-0" href="#">
                    <img src = {logo} id = "logo"/>
                </a>
                <a className="nav-link active px-3" id="userImage" aria-current="page"
                    data-bs-toggle="tooltip" data-bs-placement="bottom"
                    data-bs-custom-class="custom-tooltip"
                    data-bs-title="User Settings">
                    <img className="avatar" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExEVFhUVFxkaFRgXFxUaGBgdFhkXFxcXHRYYICggGhslHRgXITElJSorLi4uGiAzODMvNygtLisBCgoKDg0OGxAQGi0hICUtLS8rLS0tLS0uLS0rLS0tLS0tLSstLS0tLS0tLS0tLS0tKystLS0tKy0tLS0tLS03Lf/AABEIAIIAggMBIgACEQEDEQH/xAAcAAACAgMBAQAAAAAAAAAAAAAABQQGAgMHAQj/xAA/EAABAwIDBgQEAwYDCQAAAAABAAIRAyEEBTEGEkFRYYETInGRMqGxwQfR8CNCYnKCkiRS4RQWMzRTc6Ky8f/EABkBAAMBAQEAAAAAAAAAAAAAAAACBAMBBf/EACIRAAICAgIBBQEAAAAAAAAAAAABAhEDIRIxBBMUMkFRQv/aAAwDAQACEQMRAD8A7ihCEACEIQAIWutWa3UpbiM25W+qSU4x7GjBy6GyFXKmZO5n3W2jmZHD5rL3ETX28h8vA5K24+bh3YpbjsVVad5p9YT+tET0pFnQlWU5u2pYkbwMeunBNVonfRm1QIQhdAEIQgAQhCABCEIA1167WCXEAKuVs+LnkMiBxUDbTNfN4TTcRMdUuwflZHE6qXNma0jfFi5bY4q4snioz3yscPdbd0Too23Jl8UonlNbkU6IUhtLSE3Fg5IjsKyNbgVu8HoFHrtXNoXTIGLpX32WcL24p1s/nxqeV4vzlKnPhRn0t14cwx0+61xZHFmObEmrOhoUPKa5fSY52sX7WUxegQghCEACEIQAIQsK9QNa5x0aCT2EoA5pjhv4lzjzJ/L6Lzx/MQtIdDiTrxXjWy6/FeVN7PQxKkNsPUhTqL5SrDA6WhN8K3glgbzokNCzozAXjmdfosaQ9fktjI2vUCu9MHiygVad0szsWQqrZWGJuIPZSKiiVAslpmj2i1bK1i6kQeB+oH+qdKs7J1olvP6hWZerjdxR5U1TBCEJxQQhCABRsy/4T/5T9FJSnP8ANGUWhrhJqSA2QJ0BM+rgO4SydI6k26Rz3GiHrKkZWWKcHVARoRIUHH4zwxHE6LzZLZdB6HDMUxupE+qk0M3ZwcPcLmmNfUeC91VtNt/iOvo3ilfjneG7Xc/lFjrwGsJlEfls7ZTzdrxLYJC1/wC2ebof1C5Rk2alldoLz5iBrrPBdTdhXOp70RbiuNsbSIuP2npsduF0EpTiNsqQdugyeN/1K5/j8S6o9xLTBNpnThdaq1Z1F5onDAvhsbzZneAd9CCmjFsSbUezqGAz+nU/eF9ITB11zek5tGoWOpGk/QOE7s62P3HyVy2exRcyCD04Ss5DxscZNjPCcS7RplWXZ/aWji98Uz5mfE06+qp+Kb84uvdgMtc3G1KnA0z6Xc2PuqMORqSiZywReOU32jpKEIVp54IQhAAudfiziDSdhqkS39oHafwQO4Lj/SuipLtbkLcZh3UiYd8VM8nAGJ6GSD6pMiuLSNcMlGacujn1Mzft8gUqzhrrO3SQPSFMy8vAex0yws7Eh4cPUFpHZPcDTaRcarzpWWpJNnPcHlXiPNSsSWkOaGATANp6GEw2e2bo0fE3gXmq3c8wgAEgmG3MyNQRCu7cspEyGxe8SPomGFwdOmDutAPExr6lNGU+jrjC7aKTitm6bQ3yxxuS426uJjsrxhXfsuyRZ1ifOWtG8AAXHkD+im2ViaZ4iJRFWNLoU18m3jvNiRoPyPBaa2UucRvNBIsC5lJxHo4ieXFMquLLAXj4G6+g1PZNMJjadRoOs6QVxR/Gdk3W1YkZlAd8Y3pMknW30TJ1BrWwBopdas0GBZQsTUmyVwo5bZGY3ea8HoR2P5K07NZcKVPePxVIJ6D90fOfUqt4CjvFwAkkW9wrzSZDQOQA9lX48f6JfIm0uK/TNCEKokBCEIAEIQgDn+d5ZuVa4GjneIB/PJcf7t/2UCnXgBXHaTDCW1ALuG44+5b7Eu91QcW0hxb1KgzRqRbhnYzpY6+qyx+alrCdTyHP0SB5cIgEpplOUl37SrOktaJJj89B3Wa2UuUVtiI5yaDn+ICfEiYvHCPROcLtQwAhpGmij51hKRbIhxNxBsR5u5HkKqWHyNxdx3ZbvNB53Ok2IBjmmWheaf0WzB58cQ4UWUiWEkPefhAPxRzso1ajUwD4BLqB+En9yf3T05FSMFmWHw7mg1GtDQQ4EiRFh9z7JhV2owlQFtRzYJi48pnhOhFtUVYeo19GNDMQ8AtKlUsRPZQ8Fs+xh36dSabvhEggRrB5eqYjCRNuiXfR1zVDPZwTUnqPzVwVa2dpjxJHASPnIVlV2FVA87K7kCEIWpmCEIQAIQhAEXNKG/Sc3pI9RcKi4rDB+8YvqZ4fqyveYYxtJhe7QQABqS4hrWjqSQO6omLqy5xEAOm3ASYU+aP2a4pUzynhAD+uUqLn2XPrBgFUsaP8tp14z1UzxvKJMbp1teNfcOatlOq0g+UggxeBHKb24qZx/CpSvspf+6nB1WoWg6Ek/wDxNsu2fwzAHeFv+pdfXgXeqeuob2ljP6C34XCODhJm4PUcyPce4SJys25cVog0sspiC2gxo/ha0HuQJUyhSbEBgU0YUWIcTE6HUESfVDafAW/QMwmabF9SyAG7rX3Eb1m6AAnQAcAAT/UAtzagLYm4E3tbpz9VEzPFhukajtMfLRQ2Yi3l0bHD5emq0it0YSlouWzFEhrnHjYHnz+yeKr4TOGUKtGjUe1razam7vGPOw0yACeYe72CtCtUeKoj5ctghCF0AQhCABVfafbzB4IEPqb9T/psIJ/qOje9+i4rtX+ImMxTnAVfDpm24wkCOp1cqRiKpIudU3FgX/aP8T6+Jq0zG5Sp1WPFNp13DPmdqforucSHUg9hDm2dI4tN/ouA7y6v+GuaCph/CdBNIx/SZI+47JWrVHLoY0M4ZUFj/p0jhClYDEmdzeLBoCI4jW/IyeOnJUzb7J34Gu2rTJ8CuS4cmuN3N6cx09FllGatqXJufh6Hie0/NSTxuDKYTUkdPpYtu8BfQk6aNuVLD2u3SJ3SPLwIJMwY46+2qpdLMXNIuTZwtxEGe147rbTz6AbXAIFpHmiQPcnseaRUO+RcamKFMEC5mSYmJIbHvrPVL6+ZTxgeXjyP2jvKp9TNqr3H+K8ciQSV5Tq3LnED/L0J5f8Al812zlMbYjEy8k6aieAIBI/XVSNm6gxD94T4dO03hxj5gfX0VFz7MXWYw/tHQxvA3sPRdS2fwLcLhmMsIFzpIAku7mT3VHjwt2zDPOlSOdfi1moOKo0mmfCpku6Gqbj+1rD3ULZz8QcZhYDahfTt5HkuAHITcdlVM/zL/aMTWrRAe8loOoAs0HqGgBR2m8dPsq6sziqR9D7N/ilhMRDas0Hm3muz+7h3AV6pVWuAc0gg6EEEHuF8fUnXF1aNkdpsRQxFNlOs5rXVGgtB8plwBlpslcDp9OIQhZgfHb1HrIQt2dNJVz/DA/4h/wDJ9wvULESXR0Lb4b2X1wbhtNjgDcA7zRvDkY4rkGQuN78D9kISZuhsPZecD8LOrTPss6w87fU/RyEKEuNlLUen2Wqv8bRwgfM3QhdRximP8Xhetds9nNXT9rnEYPEwdMM+P7ChCu8f4Mh8j5I+euPdbx8ZQhUIYxp690yyX/mqP/dZ/wCwQhdfR0+tUIQpxT//2Q=="></img>
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-start bg-opacity-10" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">SELFIE</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-2 mb-lg-0 ">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="#">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="calendar.html">Calendar</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="pomodoro.html">Pomodoro</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="notes.html">Notes</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="d-flex gap-3">
                    {/* <div className="search">
                        <input type ="text" placeholder = "search" className="nav-link p-2 search_input"/>
                        <button type = "submit"><img id="search" src={search} /></button>
                    </div> */}
                    <a className="nav-link active p-2" href="#">
                        <img id="settings" src={gearFill} />
                    </a>
                    <a className="nav-link active p-2" href="#">
                        <div className="position-relative d-inline-block">
                            <img id="notif" src={bellFill} />
                            {numNotif > 0 && <span className="position-absolute top-0 start-100 p-1 translate-middle badge rounded-pill bg-danger">
                                +{numNotif}
                            </span>}
                        </div>
                    </a>
                </div>
            </div>
        </nav>

    );
}

export default MainNavbar;