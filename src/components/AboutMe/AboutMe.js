import React from "react";
import "./AboutMe.css";
import author from "../../images/author.jpg";

function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__outer-container">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__container">
          <div className="about-me__text-container">
            <h3 className="about-me__subtitle">Даниил</h3>
            <p className="about-me__text">Фронтенд-разработчик, 23 года</p>
            <p className="about-me__text">
              Я родился и живу в Москве, окончил Университет МИСИС, руковожу
              Хакатон Клубом Университета МИСИС, работал аналитиком геоданных.
            </p>
            <a className="about-me__link" href="https://github.com/teslaistra">
              Github
            </a>
          </div>
          <div className="about-me__photo-container">
            <img className="about-me__photo" src={author} alt="фото автора" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutMe;
