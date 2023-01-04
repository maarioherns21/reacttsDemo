import { FC } from "react";
import Popup from "reactjs-popup";
import EditForm from "../../EditForm/EditForm";
import { Movie } from "../../Models/Model";

interface Props {
  movie: Movie;
  handleDelete: () => Promise<void>;
}

const MovieI: FC<Props> = ({ movie, handleDelete }) => {
  return (
    <div >
      <h2>{movie.name}</h2>
      <img src={movie.image} alt={movie.name} style={{ height: "720px"}} />
      <h3>{movie.creator}</h3>
      <h4>{movie.body}</h4>
      <Popup trigger={<button>Update</button>}>
        <EditForm movie={movie!} />
      </Popup>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};


export default MovieI