import { FC } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../useFetch/useFetch";
import MovieI from "./MovieI/MovieI";

const MovieDetails: FC = () => {
  const { movies, error, isLoading } = useFetch();
  const params = useParams<Record<string, string | undefined>>();
  const movie = movies.find((movie) => movie._id === params.id);
  const navigate = useNavigate();


  const handleDelete = async () => {
    await fetch(`http://localhost:4000/movie/${params.id}`, {
      method: "DELETE",
    })
      .then(() => {
        console.log(`${movie?.name} was deleted from the db`);
        navigate("/home");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  
  return (
    <div>
      <div>{error ? error : null}</div>
      <div>{isLoading ? "Loading..." : ""}</div>
      {movie && <MovieI movie={movie} handleDelete={handleDelete} />}
    </div>
  );
};

export default MovieDetails;
