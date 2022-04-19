import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import MovieListInFvt from "./MovieListInFvt";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";

function PublicFavourites() {

    let userInfo = useParams();

    console.log(userInfo);

    let publicMovies = [];
    const [mov, setMov] = useState([]);


    useEffect(() => {(async () => {
        
        
        const url = "https://movie-info-app-deploy.herokuapp.com/myList/FetchFromPublicFavList/" + userInfo.id;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
            },
        }
        );
        publicMovies = await response.json();
        setMov(publicMovies)
    }
    ) ();} , []);

    

    const DeleteFromPublicFav = async (movie) => {
        try {
            const response = await fetch("https://movie-info-app-deploy.herokuapp.com/myList/DeleteFromPublicFavList", {
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
            
        } catch (error) {
            toast.error('Cannot Delete!', {
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


    }
    return (
        <div>
            <Navbar />
            <img className="icon-fvt" src="..\public\2581010.png" ></img>
            
            <div className="row fvt-row" >
                <MovieListInFvt movies={mov} handleFavClick={DeleteFromPublicFav} />
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

export default PublicFavourites