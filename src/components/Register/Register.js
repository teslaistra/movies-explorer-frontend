import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import Logo from "../../images/logo.svg";

function Register() {
  return (
    <div className="register">
      <div className="register__container">
        <Link to="/" className="register__logo">
          <img className="register__logo-image" src={Logo} alt="Логотип" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <form className="register__form">
          <div className="register__input-container">
            <label className="register__label">Имя</label>
            <input
              className="register__input"
              type="text"
              name="name"
              placeholder=""
              required
            />
            <span className="register__error register__error-message">
              Что-то пошло не так...
            </span>
          </div>
          <div className="register__input-container">
            <label className="register__label">E-mail</label>
            <input
              className="register__input"
              type="email"
              name="email"
              placeholder=""
              required
            />
            <span className="register__error register__error-message">
              Что-то пошло не так...
            </span>
          </div>
          <div className="register__input-container">
            <label className="register__label">Пароль</label>
            <input
              className="register__input"
              type="password"
              name="password"
              placeholder=""
              required
            />
            <span className="register__error register__error-message">
              Что-то пошло не так...
            </span>
          </div>
          <button className="register__button" type="submit">
            Зарегистрироваться
          </button>
        </form>
        <div className="register__signin">
          <p className="register__text">Уже зарегистрированы?</p>
          <a className="register__link" href="/signin">
            Войти
          </a>
        </div>
      </div>
    </div>
  );
}

export default Register;
