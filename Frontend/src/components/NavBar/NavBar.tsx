import { FC } from "react";
import { Link } from "react-router-dom";
import "./Style.css";

interface Props {
  deleteToken: () => void;
}


const NavBar: FC<Props> = ({deleteToken}) => {
const storage: any = localStorage.getItem("token")
const user = JSON.parse(storage)

    return (
    <div className="nav">
      <Link to="/home">Home</Link>
      <Link to="/form">Form</Link>
      {/* <Link to="/profile">profile</Link> */}
      <button onClick={deleteToken} >logout</button>
      <Link to={`user/${user?._id}`}>
        <img style={{height: "35px", borderRadius: "20px"}} src={user?.image} alt={user?.username} />
      </Link>
    </div>
  );
};

export default NavBar;
