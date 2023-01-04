import { FC } from "react";

interface Props {
  totalMovies: number;
  moviesPerPage: any;
  setCurrentPage: React.Dispatch<any>;
}

const Pagination: FC<Props> = ({totalMovies, moviesPerPage, setCurrentPage }) => {
 const pages: number[] = [];
  
  for (let i: number = 1 ; i <=  Math.ceil(totalMovies / moviesPerPage); i++) {
    pages.push(i);
  }

  return (
    <div>
      {pages.map((page: number, index: number) => (
        <div key={index}>
          <button onClick={() => setCurrentPage(page)}>{page}</button>
        </div>
      ))}
    </div>
  );
};

export default Pagination