import axios from "axios";
import { FC, useEffect, useRef, useState } from "react";
import Filebase from  "react-file-base64"
import { useNavigate } from "react-router-dom";
import { Movie } from "../Models/Model";
import "./Style.css"


const Form: FC = () => {
  const storage: any = localStorage.getItem("token");
  const user = JSON.parse(storage);
  const [data, setData] = useState<Movie>({ name: "", creator: user?._id,  body: "" });
  const [file, setFile] = useState<string>("");
  const [error, setError] = useState<any>([]);
  const [isPending, setIsPending] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let formData = new FormData();
      formData.append("photo", file);
      formData.append("name", data.name);
      formData.append("body", data.body);
      formData.append("creator", data.creator);
      const config = { headers: { "Content-Type": "multipart/form-data" } };
      await axios.post("http://localhost:4000/movie/new", formData, config);
      setError(null);
      setIsPending(false);
      navigate("/");
    } catch (error: any) {
      console.log(error.message);
      setError(error.message);
      setIsPending(false);
    }
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="form">
      <h6>{error ? error : null}</h6>
      <h1>Add Movie</h1>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          name="name"
          onChange={(e: any) => setData({ ...data, name: e.target.value })}
        />
        <textarea
          name="body"
          onChange={(e: any) => setData({ ...data, body: e.target.value })}
        />
        <input
          type="file"
          name="fileImage"
          onChange={(e: any) => setFile(e.target.files[0])}
        />
        {/* <Filebase type="file" multiple={false} value={formData.image}  onDone={({base64}) => setFormData({...formData, image: base64})} /> */}
        <button type="submit">{isPending ? "Addong.." : "Submit"}</button>
      </form>
    </div>
  );
};

export default Form