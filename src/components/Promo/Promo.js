import React from "react";
import "./Promo.css";
import headerLogo from "../../images/promo-logo.svg";
import { Link } from "react-router-dom";

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__content">
          <h1 className="promo__title">
            Учебный проект студента факультета Веб&#8209;разработки.
          </h1>
          <div className="promo__subtitle">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </div>
          <button className="promo__button">
            <a href="#about-project" className="promo__button-text">
              Узнать больше
            </a>
          </button>
        </div>

        <img
          className="promo__image"
          src={headerLogo}
          alt="web world"
          border="0"
        />
      </div>
    </section>
  );
}

export default Promo;
