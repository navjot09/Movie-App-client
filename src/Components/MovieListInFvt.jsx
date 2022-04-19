import React from "react";
import DeleteFav from "./DeleteFav";

function MovieListInFvt(props) {
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
                    {localStorage.getItem('token')?<div onClick={() =>props.handleFavClick(movie)} className="overlay-2">
                    <DeleteFav />
                    </div> : null}
                    
                </div>
            )}
        </>
    );
}

export default MovieListInFvt