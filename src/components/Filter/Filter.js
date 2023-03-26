import React from "react";
import "./Filter.css";

function Filter({ title, state, handleSearch }) {

  const [isFilterClicked, setisFilterClicked] = React.useState(
    localStorage.getItem("isShortMovies") === "true" ? true : false
  );

  function FilterClick() {
    const isShortMovies = localStorage.getItem("isShortMovies");
    if (isShortMovies === "true") {
      localStorage.setItem("isShortMovies", false);
    } else {
      localStorage.setItem("isShortMovies", true);
    }
    setisFilterClicked(!isFilterClicked);
    handleSearch();
  }

  React.useEffect(() => {
    localStorage.setItem("isShortMovies", isFilterClicked);
  }, [isFilterClicked]);

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
