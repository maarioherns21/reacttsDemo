import { FC, useState } from "react";
import { Movie } from "../Models/Model";
import Pagination from "../Pagination/Pagination";
import SearchBar from "../SearchBar/SearchBar";
import useFetch from "../useFetch/useFetch";
import MovieCard from "./Movie/Movie";

const Movies: FC = () => {
  const { movies, error, isLoading } = useFetch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [moviesPerPage] = useState<number>(3);

  const lastMovieIndex: number = currentPage * moviesPerPage;
  const firstMovieIndex: number = lastMovieIndex - moviesPerPage;
  const currentMovies: Movie[] = movies.slice(firstMovieIndex, lastMovieIndex);

  console.log(currentMovies);
  return (
    <div>
      <div>{error ? error : null}</div>
      <div>{isLoading ? "Loading..." : ""}</div>
      <SearchBar movies={movies} />
      <MovieCard movies={currentMovies} title="All Movies" />
      <Pagination totalMovies={movies.length} moviesPerPage={moviesPerPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default Movies;
