import React, { useEffect } from "react";
import "./SearchForm.css";
import icon from "../../images/icon-search-white.svg";
import Filter from "../Filter/Filter";

function SearchForm({ handleSearch, searchItemPostfix="" }) {
  const [search, setSearch] = React.useState("");

  const searchItem = "search" + searchItemPostfix;
  const isShortMoviesItem = "isShortMovies" + searchItemPostfix;

  function handleFieldChange(e) {
    setSearch(e.target.value);
  }

  function handleSubmit(e) {
    if (search == null) {
      localStorage.setItem(searchItem, "");
    }//  else if (searchItemPostfix === "Saved"){
    //   localStorage.setItem(searchItem, "");
    // } 
    else {
      localStorage.setItem(searchItem, search);
    }
    e.preventDefault();
    handleSearch();
  }

  React.useEffect(() => {
    const searchSt = localStorage.getItem(searchItem);
    if (searchItemPostfix === "Saved") {
      setSearch("");
      localStorage.setItem(searchItem, "");
      localStorage.setItem(isShortMoviesItem, false);
    } else {
    setSearch(searchSt);
    }
  }, []);

  const [isShortMovies, setIsShortMovies] = React.useState(false);
  
  useEffect(() => {
    setIsShortMovies(localStorage.getItem(isShortMoviesItem) === "true" ? true : false);
  }, []);
  
  return (
    <section className="search-form">
      <div className="search-form__outer">
        <div className="search-form__container">
          <form className="search-form__form" onSubmit={handleSubmit}>
            <input
              id="movie"
              className="search-form__input"
              name="movie"
              type="text"
              placeholder="Фильм"
              onChange={handleFieldChange}
              value={ search}
            />
            <button type="submit" className="search-form__button">
              <img
                src={icon}
                alt="Искать"
                className="search-form__button-img"
              />
            </button>
          </form>
          <div className="search-form__separator search-form__separator-type-mobile"></div>
          <Filter
            title={"Короткометражки"}
            state={isShortMovies}
            handleSearch={handleSearch}
            postfix={searchItemPostfix}
          />
        </div>
        <div className="search-form__separator-orientation-horizontal"></div>
      </div>
    </section>
  );
}

export default SearchForm;
