import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="about-project" id="about-project">
      <div className="about-project__container">
        <h2 className="about-project__title">О проекте</h2>
        <div className="about-project__content">
          <div className="about-project__stage-container">
            <h3 className="about-project__subtitle">
              Дипломный проект включал 5 этапов
            </h3>
            <p className="about-project__text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="about-project__stage-container">
            <h3 className="about-project__subtitle">
              На выполнение диплома ушло 5 недель
            </h3>
            <p className="about-project__text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>
        <div className="about-project__progress-container">
          <div className="about-project__progress-bar about-project__progress-bar_color_green">
            <p className="about-project__text about-project__text_colour_black">
              1 неделя
            </p>
          </div>
          <p className="about-project__description about-project__description-title-back">
            Back-end
          </p>
          <div className="about-project__progress-bar about-project__progress-bar_color_grey">
            <p className="about-project__text about-project__text_colour_white">
              4 недели
            </p>
          </div>
          <p className="about-project__description about-project__description-title-front">
            Front-end
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutProject;
