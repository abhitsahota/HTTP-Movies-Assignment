import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";

export const UpdateForm = ({ movies, setMovieList }) => {
    const [movie, setMovie] = useState(null);
    const { id } = useParams();
    const { push } = useHistory()

    useEffect(() => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then((res) => {
              setMovie(res.data)
            })
          .catch((err) => console.log(err.response));
    }, [id]);

    const handleSubmit = e => {
        e.preventDefault()

        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                console.log(movies)
                movies.forEach(element => {
                    if (element.id == id) {
                        console.log('movie metascore before', element.metascore)
                        element.metascore = movie.metascore
                        console.log('movie metascore after', element.metascore)
                        setMovieList([...movies]) 
                    }
                })
                push(`/movies/${id}`)
            })
            .catch(err => console.log(err))
    }

    const handleChange = e => {
        e.preventDefault()
        let val = e.target.value

        setMovie({
            ...movie,
            [e.target.name]: val
        })
    }

    return (
        <div>
            <h2>Update the metascore for the movie</h2>
            {movie ? <form onSubmit={handleSubmit}>
                <input 
                    type='number'
                    placeholder='metascore'
                    name='metascore'
                    value={movie.metascore}
                    onChange={handleChange}
                />
                <button>Submit</button>
            </form>
                :  <h2>Loading...</h2> }
            

        </div>
    )
}