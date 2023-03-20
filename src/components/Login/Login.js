import React from "react";
import "./Login.css";
import Logo from "../../images/logo.svg";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="login">
      <div className="login__container">
        <Link to="/" className="login__logo">
          <img className="login__logo-image" src={Logo} alt="логотип" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <form className="login__form">
          <label className="login__label">E-mail</label>
          <input
            className="login__input"
            type="email"
            placeholder=""
            required
          />
          <label className="login__label">Пароль</label>
          <input
            className="login__input"
            type="password"
            placeholder=""
            required
          />
          <button className="login__button" type="submit">
            Войти
          </button>
        </form>
        <p className="login__text">
          Ещё не зарегистрированы?{" "}
          <Link to="/signup" className="login__link">
            Регистрация
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
