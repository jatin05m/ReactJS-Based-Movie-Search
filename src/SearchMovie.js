import React, { useState } from 'react'
import MovieCard from './MovieCard'

function SearchMovie(){

    const [query, setQuery] = useState("")
    const [movies, setMovies] = useState([])

    const handleInput = (event)=> {
        setQuery(event.target.value)
    }

    const searchMovies = async (e) =>{
        e.preventDefault()


        const url = `https://api.themoviedb.org/3/search/movie?api_key=52d41fdb5e9b4d795dc850b3c609dfa7&language=en-US&query=${query}&page=1&include_adult=false`

        try {
            const res = await fetch(url)
            const data = await res.json()
            setMovies(data.results)
        } catch (error) {
            console.log(error);
        }
    }


    return(

        <>
        <form className="form" onSubmit={searchMovies}>
            <label className="label" htmlFor="query">Movie Name</label>
                <input 
                    className="input"
                    type="text"
                    name="query"
                    placeholder="Type a Movie Name.."
                    onChange={handleInput}
                />
                <button className="button" type="submit">
                    Search
                </button>
        </form>
        <div className="card-list">
            {movies.filter(movie => movie.poster_path).map(movie => (
                <MovieCard key={movie.id} movie={movie}/>
            ))}
        </div>
        </>
    )
}

export default SearchMovie