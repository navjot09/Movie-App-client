import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import MovieListInFvt from "./MovieListInFvt";
import Navbar, { pvtMovies } from "./Navbar";

function PvtFavourites() {

    const [mov, setMov] = useState([...pvtMovies]);


    const DeleteFromPrivateFav = async (movie) => {
        const response = await fetch("https://movie-info-app-deploy.herokuapp.com/myList/DeleteFromPvtFavList", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ _id: movie._id })
        }
        );
        const newMovies = await response.json();
        toast.success('Deleted!', {
            position: "bottom-right",
            theme: "dark",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        setMov(newMovies)

    }
    return (
        <div>
            <Navbar />
            <img className="icon-fvt" src="4029271.png"></img>
            
            <div className="row fvt-row" >
                <MovieListInFvt movies={mov} handleFavClick={DeleteFromPrivateFav}/>
            </div>
            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>


    );
}

export default PvtFavourites