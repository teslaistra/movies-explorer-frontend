import React from "react";
import "./Login.css";
import Logo from "../../images/logo.svg";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Login({ handleLogin }) {

  const history = useHistory();

  const [data, setData] = React.useState({
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();

    handleLogin(data.email, data.password);
  }

  function handleChangeEmail(e) {
    setData({ ...data, email: e.target.value });
  }

  function handleChangePassword(e) {
    setData({ ...data, password: e.target.value });
  }

  React.useEffect(() => {
    if (localStorage.getItem("jwt")) {
      history.push("/movies");
    }
  }, []);
  

  return (
    <div className="login">
      <div className="login__container">
        <Link to="/" className="login__logo">
          <img className="login__logo-image" src={Logo} alt="логотип" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <form className="login__form" onSubmit={handleSubmit}>
          <label className="login__label">E-mail</label>
          <input
            className="login__input"
            type="email"
            placeholder=""
            onChange={handleChangeEmail}
            required
          />
          <label className="login__label">Пароль</label>
          <input
            className="login__input"
            type="password"
            placeholder=""
            onChange={handleChangePassword}
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
