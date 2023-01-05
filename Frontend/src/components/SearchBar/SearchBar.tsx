import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Popup from "reactjs-popup";
import { Movie } from "../Models/Model";

interface Props {
    movies: Movie[]
}


const SearchBar:FC<Props> = ({movies}) =>{
const [input, setInput] =useState<any>([])
const [output, setOutput] =useState<any>([])
  
const searchByName: () => void = () => {
  try {
    movies.filter((movie) => {
      if (movie.name.toLowerCase().includes(input.toLowerCase())) {
       return setOutput((output:[]) => [...output, movie]);
      } else {
        return movie;
      }
    });
  } catch (error: any) {
    console.log(error.message);
  }
};


useEffect (() =>{
    setOutput([])
    searchByName()
    // eslint-disable-next-line
},[input])

return (
  <div>
    <div>
      <div>
        <div>Search</div>
        <input onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value) } />
      </div>
      <Popup trigger={<button>Search</button>}>
        <div>
          {output
          .sort((a: any, b: any) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1 )
          .map((movie: Movie) => (
            <div key={movie._id}>
           <Link to={`/movie/${movie._id}`}>
             <img src={`/uploads/${movie.fileImage}`}  alt={movie.name} style={{ maxHeight: "420px" , display: "flex" }} />
                 <h2>{movie.name}</h2>
           </Link>
            </div>
          ))}
        </div>
      </Popup>
    </div>
  </div>
);
}

export default SearchBar