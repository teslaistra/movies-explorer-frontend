import React from "react";
import { Link } from "react-router-dom";
import "./Register.css";
import { useHistory } from "react-router-dom";
import Logo from "../../images/logo.svg";

function Register({ handleRegister }) {
  const history = useHistory();

  function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;

    handleRegister(email, password, name);
  }

  React.useEffect(() => {
    if (localStorage.getItem("jwt")) {
      history.push("/");
    }
  }, []);

  function handleChangeName(e) {
    if (validateName(e.target.value)) {
      setErrors({ ...errors, name: "" });
    } else {
      setErrors({ ...errors, name: "Имя должно состоять только из букв" });
    }

    setData({ ...data, name: e.target.value });
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

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  function validatePassword(password) {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return re.test(password);
  }

  function validateName(name) {
    const re = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
    return re.test(name);
  }

  const [data, setData] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({
    name: "",
    email: "",
    password: "",
  });

  // React.useEffect(() => {
  //   setErrors({
  //     name: "",
  //     email: "",
  //     password: "",
  //   });
  // }, [data]);

  const [isDisabled, setIsDisabled] = React.useState(true);

  React.useEffect(() => {
    if (errors.name !== "" || errors.email !== "" || errors.password !== "") {
      setIsDisabled(true);
    } else if (data.name === "" || data.email === "" || data.password === "") {
      setIsDisabled(true);
    } else {
      setIsDisabled(false);
    }
  }, [errors]);

  return (
    <div className="register">
      <div className="register__container">
        <Link to="/" className="register__logo">
          <img className="register__logo-image" src={Logo} alt="Логотип" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <form className="register__form" onSubmit={handleSubmit}>
          <div className="register__input-container">
            <label className="register__label">Имя</label>
            <input
              className="register__input"
              type="text"
              name="name"
              placeholder=""
              required
              onChange={handleChangeName}
            />
            <span
              className={
                `register__error ` +
                (errors.name !== "" ? "register__error_visible" : "")
              }
            >
              {errors.name}
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
              onChange={handleChangeEmail}
            />
            <span
              className={
                `register__error ` +
                (errors.email !== "" ? "register__error_visible" : "")
              }
            >
              {errors.email}
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
              onChange={handleChangePassword}
            />
            <span
              className={
                `register__error ` +
                (errors.password !== "" ? "register__error_visible" : "")
              }
            >
              {errors.password}
            </span>
          </div>
          <button
            className={
              `register__button ` +
              (isDisabled ? "register__button-unactive" : "")
            }
            type="submit"
            disabled={isDisabled}
          >
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
