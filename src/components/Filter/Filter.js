import React from "react";
import "./Filter.css";
import { FilmsContext } from "../../contexts/FilmsContext";

function Filter({ title }) {
  const films = React.useContext(FilmsContext);

  const [isFilterClicked, setisFilterClicked] = React.useState(true);

  function FilterClick() {
    setisFilterClicked(!isFilterClicked);
  }

  React.useEffect(() => {
    if (isFilterClicked) {
      films.isShortMovies = true;
    } else {
      films.isShortMovies = false;
    }
  }, [isFilterClicked]);

  return (
    <div className="filter">
      <div
        onClick={FilterClick}
        className={`filter__button ${
          isFilterClicked && "filter__button_active"
        }`}
      >
        <div className="filter__button-cursor"></div>
      </div>
      <p className="filter__title">{title}</p>
    </div>
  );
}

export default Filter;
