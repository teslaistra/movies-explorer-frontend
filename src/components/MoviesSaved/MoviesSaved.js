import React, { useEffect } from "react";
import "./MoviesSaved.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Footer from "../Footer/Footer";
import { SHORT_MOVIE_DURATION } from "../../utils/constants";

function MoviesSaved({ onLike, onDisLike, movies, savedMovies }) {
  const [cards, setCards] = React.useState([]);

  const [search, setSearch] = React.useState("");
  const [isShortMovies, setIsShortMovies] = React.useState();

  const [savedMoviesSearch, setSavedMoviesSearch] = React.useState([]);

  useEffect(() => {
    setIsShortMovies(JSON.parse(localStorage.getItem("isShortMovies")));
    setSearch(localStorage.getItem("search"));
  }, []);

  useEffect(() => {
    setSavedMoviesSearch(
      movies.filter((movie) => {
        return savedMovies.some((savedMovie) => {
          return savedMovie.movieId === movie.id;
        });
      })
    );
  }, [savedMovies, movies]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("movies")).filter((movie) => {
      return JSON.parse(localStorage.getItem("savedFilms")).some(
        (savedMovie) => {
          return savedMovie.movieId === movie.id;
        }
      );
    });

    setSavedMoviesSearch(
      saved.filter(
        (movie) => !isShortMovies || movie.duration <= SHORT_MOVIE_DURATION
      )
    );
    setCards(
      saved.filter(
        (movie) => !isShortMovies || movie.duration <= SHORT_MOVIE_DURATION
      )
    );
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
        (movie) =>
          (movie.duration <= SHORT_MOVIE_DURATION && isShortMovies) ||
          !isShortMovies
      );
    } else {
      foundFilms = saved.filter(
        (movie) =>
          (movie.nameRU.toLowerCase().includes(search.toLowerCase()) ||
            movie.nameEN.toLowerCase().includes(search.toLowerCase())) &&
          ((movie.duration <= SHORT_MOVIE_DURATION && isShortMovies) ||
            !isShortMovies)
      );
    }

    setCards(foundFilms);
  }

  return (
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
          savedFilms={savedMovies}
        />
      </div>
      <Footer />
    </div>
  );
}

export default MoviesSaved;
