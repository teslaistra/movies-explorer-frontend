import React, { useEffect } from "react";
import "./Movies.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import MoviesMore from "../MoviesMore/MoviesMore";
import Footer from "../Footer/Footer";
import { FilmsContext } from "../../contexts/FilmsContext";
import { api } from "../../utils/MainApi";

function Movies({ moreFilms, numberOfMovies, onLike, onDisLike, onlySaved }) {
  const films = React.useContext(FilmsContext);
  const [cards, setCards] = React.useState([]);

  useEffect(() => {
    setCards(films.filteredMovies.slice(0, numberOfMovies));

    api.getSavedFilms().then((res) => {
      if (res) {
        films.savedMovies = res;
      }

      if (onlySaved) {
        setCards(films.filteredMovies.filter((movie) => {
          return res.some((savedMovie) => {
            return savedMovie.movieId === movie.id;
          });
        }));
      }
    }
    ).catch((err) => {
      console.log(err);
    });

    // if (onlySaved) {
    //   console.log(films.filteredMovies.filter((movie) => {
    //     return films.savedMovies.some((savedMovie) => {
    //       return savedMovie.movieId === movie.id;
    //     });
    //   }));
    // }
    setCards(films.filteredMovies.slice(0, numberOfMovies));

  }, [films.filteredMovies, numberOfMovies]);

  function handleSearch() {
    console.log(films);
    if (films.search === "" || films.search === undefined) {
      console.log(films.isShortMovies);
      films.filteredMovies = films.movies.filter(
        (movie) =>
          (movie.duration <= 40 && films.isShortMovies) || !films.isShortMovies
      );
    }
    films.filteredMovies = films.movies.filter(
      (movie) =>
        (movie.nameRU.toLowerCase().includes(films.search.toLowerCase()) ||
          movie.nameEN.toLowerCase().includes(films.search.toLowerCase())) &&
        ((movie.duration <= 40 && films.isShortMovies) || !films.isShortMovies)
    );
    setCards(films.filteredMovies.slice(0, numberOfMovies));

  }

  console.log(films);
  console.log(onlySaved);

  return (
    console.log(films.filteredMovies.length),
    <div className="movies">
      <div className="movies__container">
        <Header loggedIn={true} />
        <SearchForm handleSearch={handleSearch} />
        <MoviesCardList cards={cards} numberOfMovies={numberOfMovies} onLike={onLike} onDisLike={onDisLike}/>
        {cards.length === 0 ||
        cards.length <= numberOfMovies ? null : (
          <MoviesMore moreFilms={moreFilms} />
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Movies;
