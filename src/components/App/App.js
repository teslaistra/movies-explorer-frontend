import "./App.css";
import { Route, Switch } from "react-router-dom";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
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
import { FilmsContext } from "../../contexts/FilmsContext";


function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: ""
});

  const [filmsData, setFilmsData] = useState({
    movies: [],
    savedMovies: [],
    isShortMovies: false,
    isSearch: false,
    searchMovies: [],
    filteredMovies: [],
  });



function setNumberOfMoviesFromSizeOfScreen() {
  const width = window.innerWidth;
  if (width < 672) {
    setNumberOfMovies(5 + moreFilmsNumber * 2);
  } else if (width < 1024) {
    setNumberOfMovies(8 + moreFilmsNumber * 2);
  } else {
    setNumberOfMovies(12 + moreFilmsNumber * 4);
  }
}
  window.addEventListener("resize", setNumberOfMoviesFromSizeOfScreen);

  const [numberOfMovies, setNumberOfMovies] = useState(0);
  const [moreFilmsNumber, setMoreFilmsNumber] = useState(0);

  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    if (loggedIn) {
      moviesApi.getMovies().then((res) => {
        if (res) {
          setFilmsData({
            ...filmsData,
            movies: res,
            filteredMovies: res,  
          });

          setNumberOfMoviesFromSizeOfScreen();
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      }
      );
    }
  }, [loggedIn]);

// useEffect(() => {
//     setIsLoading(true);
//     if (loggedIn) {
//       api.getSavedFilms().then((res) => {
//         if (res) {
//           setFilmsData({
//             ...filmsData,
//             savedMovies: res,
//           });
//         }
//       })
//       .catch((err) => {
//         console.log(err);
//       })
//       .finally(() => {
//         setIsLoading(false);
//       }
//       );
//     }
//   }, [loggedIn]);

  function moreFilms() {
    setMoreFilmsNumber(moreFilmsNumber + 1);
    setNumberOfMoviesFromSizeOfScreen();
  }
  
  function handleRegister(email, password, name) {
    setIsLoading(true);
    api
      .register(email, password, name)
      .then((res) => {
        if (res) {
          handleRegister(email, password, name);
          history.push("/signin");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

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
          history.push("/movies");
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }
  
  function handleSignout() {
    localStorage.removeItem("jwt");
    setLoggedIn(false);
    history.push("/signin");
  }

  function handleEditProfile(name, email) {
    setIsLoading(true);
    api
      .updateUserInfo(name, email)
      .then((res) => {
        if (res) {
          setCurrentUser(res.data);
          history.push("/profile");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  function handleLikeClick(movie) {
    api.saveFilm(movie).then((res) => {
      if (res) {
        setFilmsData({
          ...filmsData,
          savedMovies: [...filmsData.savedMovies, res],
        });
      }
    }
    );
  }

  function handleDeleteMovie(id) {
    api.deleteFilm(id).then((res) => {
      setFilmsData({
        ...filmsData,
        savedMovies: filmsData.savedMovies.filter((c) => c._id !== id),
      });
    });
  }



  useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      api.updateHeader();
      api.getUserInfo().then((res) => {
        if (res) {
          setCurrentUser(res.data);
        } 
      });
      setLoggedIn(true);
      history.push("/movies");
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
                  <FilmsContext.Provider value={filmsData}>

      <div className="page">
        <div className="page__content">
          <Switch>
            <ProtectedRoute exact path="/" component={Main} loggedIn={loggedIn} />
              <ProtectedRoute exact path="/movies" component={Movies} onlySaved={false} onLike={handleLikeClick} onDisLike={handleDeleteMovie} numberOfMovies={numberOfMovies} loggedIn={loggedIn} moreFilms={moreFilms} />
              <ProtectedRoute exact path="/saved-movies" component={SavedMovies} onlySaved={true} onLike={handleLikeClick} onDisLike={handleDeleteMovie} numberOfMovies={numberOfMovies} loggedIn={loggedIn} />
            <ProtectedRoute exact path="/profile" component={Profile} loggedIn={loggedIn} onEditProfile={handleEditProfile} handleSignout={handleSignout}/>
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
      </FilmsContext.Provider>

    </CurrentUserContext.Provider>
  );
}

export default App;
