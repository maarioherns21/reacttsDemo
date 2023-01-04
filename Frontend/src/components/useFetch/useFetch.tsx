import { useEffect, useState } from "react";
import { Movie } from "../Models/Model";

export default function useFetch() {
  // const moviess = [
  //     { id:"20", name: "Marco Polo", creator:"mario", body: "Really good movie" , image:""  },
  //     { id:"10", name: "Harry Potter",creator:"mario", body: "Really good movie", image:"" },
  //     { id:"1" , name: "Thor", creator:"mario", body: "Best Movie", image:"" },
  //     { id:"12", name: "Spider man", creator:"mario" ,body: "Love The movie", image:"" },
  //     { id:"11" , name: "Dragon Ball Z", creator:"mario", body: "Crazy ", image:"" },
  // ]

  const [error, setError] = useState<any>([]);
  const [isLoading, setisLoading] = useState<boolean>(true);
  const [movies, setMovies] = useState<Movie[]>([]);

  const fetchData = async () => {
    try {
      const getData = await fetch("http://localhost:4000/movie");
      const data = await getData.json();
      setMovies(data);
      setError(null);
      setisLoading(false);
    } catch (err: any) {
      setError(err.message);
      setisLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { movies, error, isLoading } as const;
}
