import React from "react";
import "./Filter.css";

function Filter({ title, state, handleSearch, postfix = "" }) {

  const isShortMoviesItem = "isShortMovies" + postfix;

  const [isFilterClicked, setisFilterClicked] = React.useState(
    localStorage.getItem(isShortMoviesItem) === "true" ? true : false
  );

  function FilterClick() {
    const isShortMovies = localStorage.getItem(isShortMoviesItem);
    if (isShortMovies === "true") {
      localStorage.setItem(isShortMoviesItem, false);
    } else {
      localStorage.setItem(isShortMoviesItem, true);
    }
    setisFilterClicked(!isFilterClicked);
    handleSearch();
  }

  React.useEffect(() => {
    setisFilterClicked(localStorage.getItem(isShortMoviesItem) === "true" ? true : false);
  }, []);

  return (
    <div className="filter">
      <div
        onClick={FilterClick}
        className={`filter__button ${
          isFilterClicked ? "filter__button_active" : ""
        }`}
      >
        <div className="filter__button-cursor"></div>
      </div>
      <p className="filter__title">{title}</p>
    </div>
  );
}

export default Filter;
