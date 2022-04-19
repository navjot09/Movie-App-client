import React, { useEffect, useState } from 'react';
import MovieListInDashboard from './MovieListInDashboard';
import Navbar from './Navbar';
function Dashboard() {

  const [movies, setMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState("");

  const getMovieRequest = async (searchMovies) => {
    const url = "https://www.omdbapi.com/?s=" + searchMovies + "&apikey=efb28e14";

    const response = await fetch(url);
    const responseJSON = await response.json();

    if (responseJSON.Search) {
      setMovies(responseJSON.Search);
    }

  }

  useEffect(
    () => {
      getMovieRequest(searchMovies);
    }, [searchMovies]
  );

  return (
    <div className='container-fluid'>
      <div className='row'>
        <Navbar/>
      </div>
      <div className='row'>
      <h3 className='text' >Hi, Looking For a Movie?</h3>
        <form className="d-flex search-block">
          <input placeholder="Search For Movies"className="search-bar form-control me-2" value={searchMovies}
            onChange={(event) => {
              setSearchMovies(event.target.value)
            }}
          />
        </form>
      </div>
      <div style={{marginBottom : "20 px"}} className='row'>
        <MovieListInDashboard movies={movies}/>
      </div>
      
    </div>

  );
}


export default Dashboard