import React from "react";
import "./Filter.css";

function Filter({ title }) {
  const [isFilterClicked, setisFilterClicked] = React.useState(true);

  function FilterClick() {
    setisFilterClicked(!isFilterClicked);
  }

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
