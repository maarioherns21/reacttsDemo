import { FC } from "react";
import { Link } from "react-router-dom";
import "./Style.css";

const NavBar: FC = () => {
 
    return (
    <div className="nav">
      <Link to="/home">Home</Link>
      <Link to="/form">Form</Link>
      <Link to="/profile">profile</Link>
    </div>
  );
};

export default NavBar;
