import { FC } from "react";
import { Link } from "react-router-dom";
import { Movie } from "../../../Models/Model";

interface Props {
  movie: Movie;
}

const MovieItem: FC<Props> = ({ movie }) => {
  return (
    <div>
      <Link to={`/movie/${movie._id}`}>
        <img src={`/uploads/${movie.fileImage}`}  alt={movie.name} style={{ maxHeight: "420px" , display: "flex" }} />
        <h3>{movie.name}</h3>
      </Link>
    </div>
  );
};

export default MovieItem;
