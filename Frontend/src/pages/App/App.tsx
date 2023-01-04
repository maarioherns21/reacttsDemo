import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../Home/Home";
import Profile from "../Profile/Profile";
import Form from "../../components/Form/Form";
import MovieDetails from "../../components/MovieDetails/MovieDetails";
import NavBar from "../../components/NavBar/NavBar";
// import SignupPage from '../SignupPage/SignupPage';
import LoginPage from "../LoginPage/LoginPage";

function App() {
  const [token, setToken] = useState<boolean>(true);

  if (!token) {
    return <LoginPage setToken={setToken} />;
  }
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <header className="App-header">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="form" element={<Form />} />
            <Route path="/movie/:id" element={<MovieDetails />} />
          </Routes>
        </header>
      </BrowserRouter>
    </div>
  );
}

export default App;
