import React from "react";
import "./SearchForm.css";
import icon from "../../images/icon-search-white.svg";
import Filter from "../Filter/Filter";

function SearchForm() {
  return (
    <section className="search-form">
      <div className="search-form__outer">
        <div className="search-form__container">
          <form className="search-form__form">
            <input
              id="movie"
              className="search-form__input"
              required
              name="movie"
              type="text"
              placeholder="Фильм"
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
