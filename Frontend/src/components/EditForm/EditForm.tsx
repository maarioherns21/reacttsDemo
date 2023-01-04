import { FC, useEffect, useRef, useState } from "react";
import { Movie } from "../Models/Model";
import Filebase from "react-file-base64"
import { useNavigate, useParams } from "react-router-dom";

interface Props {
  movie: Movie;
}

const EditForm:FC<Props> = ({movie}) =>{
    const [formData, setFormData] = useState<Movie>({ ...movie });
    const [error, setError] = useState<any>([]);
    const [isPending, setIsPending] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const params = useParams<Record<string, string | undefined>>();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const movie = { ...formData };
      setIsPending(true);
      await fetch(`http://localhost:4000/movie/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(movie),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setError(null);
          navigate("/home");
        })
        .catch((err) => {
          setError(err.message);
          setIsPending(false);
        });
    };

    const clear = (e: React.FormEvent) => {
      e.preventDefault();
      setFormData({ ...movie });
    };

    useEffect(() => {
      inputRef.current?.focus();
    }, []);
    
        return (
          <div className="form">
            <h6>{error ? error : null}</h6>
            <h1  style={{ color: "white "}}>Update Movie</h1>
            <form onSubmit={handleSubmit}>
              <input ref={inputRef} value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <textarea value={formData.body} onChange={(e) => setFormData({...formData, body: e.target.value})} />
              {/* <select value={formData.creator} onChange={(e) => setFormData({...formData, creator: e.target.value})}>
                <option value="mario">mario</option>
                <option value="mark">mark</option>
              </select> */}
              <Filebase type="file" multiple={false} value={formData.image}  onDone={({base64}) => setFormData({...formData, image: base64})} />
              <button>{isPending ? "Submiting..." : "Submit"}</button>
              <button onClick={clear}>clear</button>
            </form>
          </div>
        );
    }
    
    export default EditForm