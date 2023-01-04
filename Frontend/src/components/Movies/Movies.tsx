import { FC } from "react";
import useFetch from "../useFetch/useFetch";
import MovieCard from "./Movie/Movie";

const Movies: FC = () => {
  const { movies, error, isLoading } = useFetch();

  return (
    <div>
      <div>{error ? error : null}</div>
      <div>{isLoading ? "Loading..." : ""}</div>
      <MovieCard movies={movies} title="All Movies" />
    </div>
  );
};

export default Movies;
