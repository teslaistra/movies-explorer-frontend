import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
        <p className="footer__text">
          Учебный проект Яндекс.Практикум х BeatFilm.
        </p>
        <div className="footer__low-container">
          <p className="footer__year">© 2023</p>
          <ul className="footer__list">
            <li className="footer__list-item">
              <a className="footer__link" href="https://praktikum.yandex.ru/">
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__list-item">
              <a className="footer__link" href=" ">
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
