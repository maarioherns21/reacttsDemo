import { FC } from "react";
import Popup from "reactjs-popup";
import EditForm from "../../EditForm/EditForm";
import { Movie } from "../../Models/Model";

interface Props {
  movie: Movie;
  handleDelete: () => Promise<void>;
}

const MovieI: FC<Props> = ({ movie, handleDelete }) => {
const storage: any = localStorage.getItem("token")
const user = JSON.parse(storage)
  return (
    <div>
      <h2>{movie.name}</h2>
      <img src={`/uploads/${movie.fileImage}`}  alt={movie.name} style={{ maxHeight: "420px" , display: "flex" }} />
      <h3>{movie.creator}</h3>
      <h4>{movie.body}</h4>
      {user?._id === movie.creator && (
        <>
          <Popup trigger={<button>Update</button>}>
            <EditForm movie={movie!} />
          </Popup>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};


export default MovieI