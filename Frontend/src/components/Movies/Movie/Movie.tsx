import { FC } from "react";
import MovieItem from "./MovieItem/MovieItem";
import { Movie } from "../../Models/Model";

interface Props {
    movies: Movie[];
    title: string;
}


const MovieCard:FC<Props> = ({movies,title}) =>{

    return (
        <div>
        <h1>{title}</h1>
        {movies.map((movie) => (
            <div key={movie._id}>
            <MovieItem movie={movie}  />
            </div>
        ))}
     </div>
    )
}

export default MovieCard