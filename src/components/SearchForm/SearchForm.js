import React from "react";
import "./SearchForm.css";
import icon from "../../images/icon-search-white.svg";
import Filter from "../Filter/Filter";
import { FilmsContext } from "../../contexts/FilmsContext";

function SearchForm({ handleSearch }) {
  const films = React.useContext(FilmsContext);

  const [search, setSearch] = React.useState("");

  function handleFieldChange(e) {
    setSearch(e.target.value);
  };

  function handleSubmit(e) {
    films.search = search;
    e.preventDefault();
    handleSearch();
  }


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
          <Filter title={"Короткометражки"} />
        </div>
        <div className="search-form__separator-orientation-horizontal"></div>
      </div>
    </section>
  );
}

export default SearchForm;
