import React from "react";
import AddToPrivate from "./AddToPrivate";
import AddToPublic from "./AddToPublic";
import { toast, ToastContainer } from "react-toastify";

function MovieListInDashboard(props) {

    const AddToPublicFav = async (movie) => {
        await fetch('https://movie-info-app-deploy.herokuapp.com/myList/AddToPublicFavList', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ Title: movie.Title, Poster: movie.Poster, imdbID: movie.imdbID, Year: movie.Yearm})
        })
        toast.success('Added To Public List', {
            position: "bottom-right",
            theme: "dark",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }
    const AddToPrivateFav = async (movie) => {
        
        await fetch('https://movie-info-app-deploy.herokuapp.com/myList/AddToPvtFavList', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ Title: movie.Title, Poster: movie.Poster, imdbID: movie.imdbID, Year: movie.Year})
        })
        
        toast.success('Added To Private List', {
            position: "bottom-right",
            theme: "dark",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }



    return (

        <>
            {props.movies.map((movie, index) =>
                <div className="card movie-card">
                    <img src={movie.Poster} className="card-img-top movie-img" alt="movie"></img>
                    <div className="card-body">
                        <h5 className="card-title">{movie.Title}</h5>
                        <p className="card-text">Year : {movie.Year}</p>
                        <p className="card-text">imdbID : {movie.imdbID}</p>
                    </div>
                    <div onClick={() => AddToPublicFav(movie)} className="overlay-1">
                        <AddToPublic />
                    </div>
                    <div onClick={() => AddToPrivateFav(movie)} className="overlay-2">
                        <AddToPrivate />
                    </div>
                </div>
            )}
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
        </>
    );
}

export default MovieListInDashboard