import { FC } from "react";
import MovieCard from "../../components/Movies/Movie/Movie";
import useFetch from "../../components/useFetch/useFetch";




const Profile: FC = () => {
  const { movies, error, isLoading } = useFetch();
  const movie = movies.filter((movie) => movie.creator === "mario");

  return (
    <div>
      <div>{error ? error : null}</div>
      <div>{isLoading ? "Loading..." : ""}</div>
      <MovieCard movies={movie} title="Mario Movies" />
    </div>
  );
};


export default Profile