import React from "react";
import "./Portfolio.css";

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <h2 className="portfolio__title">Портфолио</h2>
        <ul className="portfolio__list">
          <li className="portfolio__list-item">
            <a href="  " className="portfolio__link">
              <p className="portfolio__link-text">Статичный сайт</p>
              <p className="portfolio__link-text">↗</p>
            </a>
          </li>
          <li className="portfolio__list-item">
            <a href="  " className="portfolio__link">
              <p className="portfolio__link-text">Адаптивный сайт</p>
              <p className="portfolio__link-text">↗</p>
            </a>
          </li>
          <li className="portfolio__list-item">
            <a href="  " className="portfolio__link">
              <p className="portfolio__link-text">Одностраничное приложение</p>
              <p className="portfolio__link-text">↗</p>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Portfolio;
