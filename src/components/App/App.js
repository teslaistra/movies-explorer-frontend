import "./App.css";
import { Route, Switch } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import MoviesSaved from "../MoviesSaved/MoviesSaved";
import Profile from "../Profile/Profile";
import Login from "../Login/Login";
import NotFound from "../NotFound/NotFound";
import Register from "../Register/Register";
import { api } from "../../utils/MainApi";
import { moviesApi } from "../../utils/MoviesApi";
import { useEffect, useState } from "react";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import { useHistory } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Preloader from "../Preloader/Preloader";
import ErrorPopup from "../ErrorPopup/ErrorPopup";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    !(localStorage.getItem("jwt") == null) ? true : false
  );
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
  });
  const [numberOfMovies, setNumberOfMovies] = useState(0);
  const [moreFilmsNumber, setMoreFilmsNumber] = useState(0);
  const [isError, setIsError] = useState(false);

  const [films, setFilms] = useState([]);

  function setNumberOfMoviesFromSizeOfScreen() {
    const moreFilms = localStorage.getItem("moreFilmsNumber");

    const width = window.innerWidth;
    if (width < 640) {
      setNumberOfMovies(5 + moreFilms * 2);
      localStorage.setItem("numberOfMovies", 5 + moreFilms * 2);
    } else if (width < 1093) {
      setNumberOfMovies(8 + moreFilms * 2);
      localStorage.setItem("numberOfMovies", 8 + moreFilms * 2);
    } else if (width < 1280) {
      setNumberOfMovies(9 + moreFilms * 3);
      localStorage.setItem("numberOfMovies", 9 + moreFilms * 3);
    } else {
      setNumberOfMovies(12 + moreFilms * 4);
      localStorage.setItem("numberOfMovies", 12 + moreFilms * 4);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", setNumberOfMoviesFromSizeOfScreen);

    return () => {
      window.removeEventListener("resize", setNumberOfMoviesFromSizeOfScreen);
    };
  }, []);

  const history = useHistory();

  function getMoviesInitial() {
    setIsLoading(true);
    if (loggedIn) {
      if (localStorage.getItem("movies") == null) {
        moviesApi
          .getMovies()
          .then((res) => {
            if (res) {
              localStorage.setItem("movies", JSON.stringify(res));
              setFilms(res);
              localStorage.setItem("foundFilms", JSON.stringify(res));
              localStorage.setItem("moreFilmsNumber", 0);
              localStorage.setItem("search", "");
              localStorage.setItem("isShortMovies", "false");

              setNumberOfMoviesFromSizeOfScreen();
            }
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        localStorage.setItem("moreFilmsNumber", 0);
        localStorage.setItem("search", "");
        localStorage.setItem("isShortMovies", "false");
        setNumberOfMoviesFromSizeOfScreen();
      }
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (loggedIn) {

      api
        .getSavedFilms()
        .then((res) => {
          if (res) {
            localStorage.setItem("savedFilms", JSON.stringify(res));
          }
        }).then(() => {
          getMoviesInitial();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function moreFilms() {
    setMoreFilmsNumber(moreFilmsNumber + 1);
    localStorage.setItem("moreFilmsNumber", moreFilmsNumber + 1);
    setNumberOfMoviesFromSizeOfScreen();
  }

  function handleRegister(email, password, name) {
    setIsLoading(true);
    api
      .register(email, password, name)
      .then((res) => {
        if (res) {
          handleLogin(email, password);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLogin(email, password) {
    setIsLoading(true);
    api
      .authorize(email, password)
      .then((res) => {
        if (res) {
          localStorage.setItem("jwt", res.token);
          api.updateHeader();
          api.getUserInfo().then((res) => {
            if (res) {
              setCurrentUser(res.data);
            }
          });
          setLoggedIn(true);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
        history.push("/movies");
      });
  }

  function handleSignout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    setIsLoading(false);

    localStorage.removeItem("moreFilmsNumber");
    localStorage.removeItem("numberOfMovies");
    localStorage.removeItem("movies");
    localStorage.removeItem("foundFilms");
    localStorage.removeItem("savedFilms");
    localStorage.removeItem("foundFilmsSaved");
    localStorage.removeItem("foundFilmsFilter");
    localStorage.removeItem("isShortMovies");
    localStorage.removeItem("search");

    history.push("/");
  }

  function handleEditProfile(name, email, setIsSuccess) {
    setIsLoading(true);
    api
      .updateUserInfo({ name, email })
      .then((res) => {
        if (res) {
          setCurrentUser(res.data);
          history.push("/profile");
        }
      })
      .then(() => {
        setIsSuccess(true);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleLikeClick(movie) {
    api.saveFilm(movie).then((res) => {
      if (res) {
        const savedMovies = localStorage.getItem("savedFilms");
        if (savedMovies) {
          localStorage.setItem(
            "savedFilms",
            JSON.stringify([...JSON.parse(savedMovies), res])
          );
        } else {
          localStorage.setItem("savedFilms", JSON.stringify([res]));
        }
      }
    });
  }

  function handleDeleteMovie(id) {
    api.deleteFilm(id).then((res) => {
      if (res) {
        const savedMovies = localStorage.getItem("savedFilms");

        if (savedMovies) {
          localStorage.setItem(
            "savedFilms",
            JSON.stringify(
              JSON.parse(savedMovies).filter((movie) => movie._id !== id)
            )
          );
        }
      }
    });
  }

  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setLoggedIn(true);
    }
  }, [setLoggedIn]);

  useEffect(() => {
    api.updateHeader();
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      api.getUserInfo().then((res) => {
        if (res) {
          setCurrentUser(res.data);
        }
      });
    }
  }, []);

  function onClosePopup() {
    setIsError(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <div className="page__content">
          <ErrorPopup onClose={onClosePopup} isOpen={isError} />
          <Switch>
            <Route exact path="/" loggedIn={loggedIn}>
              <Main loggedIn={loggedIn} />
            </Route>
            <ProtectedRoute
              exact
              path="/movies"
              component={Movies}
              onLike={handleLikeClick}
              onDisLike={handleDeleteMovie}
              numberOfMovies={numberOfMovies}
              loggedIn={loggedIn}
              moreFilms={moreFilms}
              movies={films}
            />
            <ProtectedRoute
              exact
              path="/saved-movies"
              component={MoviesSaved}
              onLike={handleLikeClick}
              onDisLike={handleDeleteMovie}
              numberOfMovies={numberOfMovies}
              loggedIn={loggedIn}
              moreFilms={moreFilms}
            />
            <ProtectedRoute
              exact
              path="/profile"
              component={Profile}
              loggedIn={loggedIn}
              onEditProfile={handleEditProfile}
              handleSignout={handleSignout}
            />
            <Route exact path="/signin">
              <Login handleLogin={handleLogin} />
            </Route>
            <Route exact path="/signup">
              <Register handleRegister={handleRegister} />
            </Route>
            <Route exact path="*">
              <NotFound />
            </Route>
          </Switch>
          {isLoading && <Preloader />}
        </div>
        {/* <Footer /> */}
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
