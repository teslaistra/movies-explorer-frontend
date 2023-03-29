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

  const [errors, setErrors] = React.useState({
    email: "",
    password: "",
  });

  const [isDisabled, setIsDisabled] = React.useState(true);


  function handleSubmit(e) {
    e.preventDefault();

    handleLogin(data.email, data.password);
  }

  function handleChangeEmail(e) {
    if (validateEmail(e.target.value)) {
      setErrors({ ...errors, email: "" });
    } else {
      setErrors({ ...errors, email: "Неправильный формат Email" });
    }
    setData({ ...data, email: e.target.value });
  }

  function handleChangePassword(e) {
    if (validatePassword(e.target.value)) {
      setErrors({ ...errors, password: "" });
    } else {
      setErrors({
        ...errors,
        password:
          "Пароль должен состоять из не менее 8 символов, заглавных и строчных букв и цифр",
      });
    }

    setData({ ...data, password: e.target.value });
  }

  React.useEffect(() => {
    if (localStorage.getItem("jwt")) {
      history.push("/");
    }
  }, []);

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function validatePassword(password) {

    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(password);
  }

  React.useEffect(() => {
    if ((validateEmail(data.email) && validatePassword(data.password))) {
      setIsDisabled(false);
    }
    else if (data.email === "" || data.password === "") {
      setIsDisabled(true);
    } 
    else {
      setIsDisabled(true);
    }
  }, [data]);


  
  

  return (
    <div className="login">
      <div className="login__container">
        <Link to="/" className="login__logo">
          <img className="login__logo-image" src={Logo} alt="логотип" />
        </Link>
        <h1 className="login__title">Рады видеть!</h1>
        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__input-container">
          <label className="login__label">E-mail</label>
          <input
            className="login__input"
            type="email"
            placeholder=""
            onChange={handleChangeEmail}
            required
          />
          <span className={`login__error ` + (errors.email !== "" ? 'login__error_visible' : '')}>
              {errors.email} 
          </span>
          </div>
          <div className="login__input-container">
          <label className="login__label">Пароль</label>
          <input
            className="login__input"
            type="password"
            placeholder=""
            onChange={handleChangePassword}
            required
          />
          <span className={`login__error ` + (errors.password !== "" ? 'login__error_visible' : '')}>

              {errors.password}
          </span>
          </div>
          <button className={`login__button ` + (isDisabled ? 'login__button-unactive' : '')} type="submit" disabled={isDisabled}>
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
