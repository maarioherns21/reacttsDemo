import { FC, useEffect, useRef, useState } from "react";
import Filebase from  "react-file-base64"
import { useNavigate } from "react-router-dom";
import { Movie } from "../Models/Model";
import "./Style.css"



const Form:FC = () =>{
const storage: any = localStorage.getItem("token");
const user = JSON.parse(storage);
const [formData, setFormData] = useState<Movie>({
  name: "",
  creator: user?._id,
  body: "",
  image: "",
});
const [error, setError] = useState<any>([]);
const [isPending, setIsPending] = useState<boolean>(false);
const inputRef = useRef<HTMLInputElement>(null);
const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  const movie = { ...formData };
  await fetch("http://localhost:4000/movie/new", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movie),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      navigate("/");
      setError(null);
      setIsPending(false);
    })
    .catch((err) => {
      setError(err.message);
      setIsPending(false);
    });
};

const clear = (e: React.FormEvent) => {
  e.preventDefault();
  setFormData({ name: "", body: "", image: "" });
};

useEffect(() => {
  inputRef.current?.focus();
}, []);

    return (
      <div className="form">
        <h6>{error ? error : null}</h6>
        <h1>Add Movie</h1>
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

export default Form