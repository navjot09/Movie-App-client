import React from 'react';
import { Link, useNavigate} from 'react-router-dom';

let pvtMovies = [];
let publicMovies = [];
let userInfo = {};
function Navbar() {

    let navigate = useNavigate();
    const handlePvtFavClick = async () => {
        
        const response = await fetch("https://movie-info-app-deploy.herokuapp.com/myList/FetchFromPvtFavList", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
        }
        );
        pvtMovies = await response.json();
        navigate('/PvtFavourites')
    }

    const handlePublicFavClick = async () => {

        const res = await fetch('https://movie-info-app-deploy.herokuapp.com/auth/getUser', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                }
            });
            userInfo = await res.json();
        const url = "https://movie-info-app-deploy.herokuapp.com/myList/FetchFromPublicFavList/" + userInfo._id;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        }
        );
        publicMovies = await response.json();
        navigate('/PublicFavourites/' + userInfo._id)
        
    }

    const handleLogOut = async () => {
        localStorage.clear();
        navigate('/');
    }

    const handleProfile = async () => {
        try {
            const response = await fetch('https://movie-info-app-deploy.herokuapp.com/auth/getUser', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('token')
                }
            });
            userInfo = await response.json();
            navigate('/Profile');
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <div className="container-fluid" style={{ width: "140px" }}>
                    <Link className="navbar-brand" to="/Dashboard">
                        <img src="https://cdn-icons-png.flaticon.com/512/777/777242.png" alt="" width="30" height="24" className="d-inline-block align-text-top" />
                        Movies
                    </Link>
                </div>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item dropdown">
                            <div className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Favourites
                            </div>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <div style={{ cursor: "pointer" }} onClick={handlePvtFavClick} className="dropdown-item" >Private</div>
                                <div style={{ cursor: "pointer" }} onClick={handlePublicFavClick} className="dropdown-item" >Public</div>

                            </div>
                        </li>
                    </ul>
                    <svg style={{ marginRight: "2rem", cursor: "pointer" }} onClick={handleProfile} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="white" class="bi bi-person-fill" viewBox="0 0 16 16"> <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" /> </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" onClick={handleLogOut} width="30" height="30" fill="currentColor" className="bi bi-box-arrow-right" viewBox="0 0 16 16" style={{ cursor: "pointer" }}>
                        <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z" />
                        <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
                    </svg>
                </div>
            </div>

        </nav>

    );
}


export default Navbar;
export {pvtMovies, publicMovies, userInfo }