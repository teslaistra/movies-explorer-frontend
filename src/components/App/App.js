import "./App.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";

function App() {
  return (
    <BrowserRouter>
      <div className="page">
        <div className="page__content">
          <Routes>
            <Route exact path="/" element={<Main />} />
            <Route exact path="/movies" element={<Movies />} />
            <Route exact path="/saved-movies" element={<SavedMovies />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/signin" element={<Login />} />
            <Route exact path="/signup" element={<Register />} />
            <Route exact path="*" element={<NotFound />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
