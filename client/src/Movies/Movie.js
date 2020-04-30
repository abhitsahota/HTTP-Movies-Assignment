import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setMovieList, movies }) {
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const { push } = useHistory()

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }
  
  const handleDelete = (e) => {
    e.preventDefault()

    axios
    .delete(`http://localhost:5000/api/movies/${params.id}`)
    .then(res => {
      const moviesLeft = movies.filter(movie => movie.id !== res.data)
      setMovieList(moviesLeft)
      push('/')
      
    })
    .catch(err => console.log(err))
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      <button onClick={ () => {}} >Edit</button>
      <button onClick={handleDelete} >Delete</button>

    </div>
  );
}

export default Movie;
