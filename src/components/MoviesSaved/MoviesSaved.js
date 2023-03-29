import React, { useEffect } from "react";
import "./MoviesSaved.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";

function MoviesSaved({ onLike, onDisLike, savedMovies }) {
  const [cards, setCards] = React.useState([]);

  const [savedMoviesSearch, setSavedMoviesSearch] = React.useState(() => {
    return JSON.parse(localStorage.getItem("movies")).filter((movie) => {
      return JSON.parse(localStorage.getItem("savedFilms")).some(
        (savedMovie) => {
          return savedMovie.movieId === movie.id;
        }
      );
    });
  });

  const [isShortMovies, setIsShortMovies] = React.useState(
    JSON.parse(localStorage.getItem("isShortMovies"))
  );

  const [search, setSearch] = React.useState(localStorage.getItem("search"));

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("movies")).filter((movie) => {
      return JSON.parse(localStorage.getItem("savedFilms")).some(
        (savedMovie) => {
          return savedMovie.movieId === movie.id;
        }
      );
    });

    setSavedMoviesSearch(
      saved.filter((movie) => !isShortMovies || movie.duration <= 40)
    );
    setCards(saved.filter((movie) => !isShortMovies || movie.duration <= 40));
  }, [setIsShortMovies]);

  function handleSearch() {
    const saved = JSON.parse(localStorage.getItem("movies")).filter((movie) => {
      return JSON.parse(localStorage.getItem("savedFilms")).some(
        (savedMovie) => {
          return savedMovie.movieId === movie.id;
        }
      );
    });

    const isShortMovies = JSON.parse(localStorage.getItem("isShortMovies"));
    const search = localStorage.getItem("search");

    let foundFilms = [];

    if (search === "" || search === undefined) {
      foundFilms = saved.filter(
        (movie) => (movie.duration <= 40 && isShortMovies) || !isShortMovies
      );
    } else {
      foundFilms = saved.filter(
        (movie) =>
          (movie.nameRU.toLowerCase().includes(search.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(search.toLowerCase())) &&
          ((movie.duration <= 40 && isShortMovies) || !isShortMovies)
      );
    }

    setCards(foundFilms);
  }

  return (
    console.log(savedMovies),
    <div className="movies">
      <div className="movies__container">
        <Header loggedIn={true} />
        <SearchForm handleSearch={handleSearch} />
        <MoviesCardList
          cards={cards}
          numberOfMovies={cards.length}
          onLike={onLike}
          onDisLike={onDisLike}
          onlySaved={true}
          savedMovies={savedMovies}
        />
      </div>
      <Footer />
    </div>
  );
}

export default MoviesSaved;
