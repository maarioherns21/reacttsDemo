// import { useState } from "react";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Profile from "../Profile/Profile";
import Form from "../../components/Form/Form";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import NavBar from "../../components/NavBar/NavBar";
import LoginPage from "../LoginPage/LoginPage";
import { useToken } from "../../components/useToken/useToken";
import SignupPage from "../SignupPage/SignupPage";

function App() {
  // const [token, setToken] = useState<boolean>(true);
  const {token, setToken, deleteToken} =useToken()

  if (token) {
    return (
       <div className="App">
      <BrowserRouter>
        <NavBar deleteToken={deleteToken} />
        <header className="App-header">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/user/:profile" element={<Profile />} />
            <Route path="form" element={<Form />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </header>
      </BrowserRouter>
    </div>
    )
  }
  return (
    <div className="App">
      <BrowserRouter>
        <header className="App-header">
          <Routes>
            <Route path="/login" element={<LoginPage setToken={setToken} />} />
            <Route path="/signup" element={<SignupPage setToken={setToken} />}/>
            <Route path="/*" element={<Navigate to="/login" />} />
          </Routes>
        </header>
      </BrowserRouter>
    </div>
  );
}

export default App;
