import React, { useEffect } from "react";
import "./ProfileForm.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ProfileForm({ onEditProfile, handleSignout }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [errors, setErrors] = React.useState({
    name: "",
    email: "",
  });

  const [data, setData] = React.useState({ name: currentUser.name, email: currentUser.email });

  const [isSuccess, setIsSuccess] = React.useState(false);

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);

    setData({ ...data, name: currentUser.name });
    setData({ ...data, email: currentUser.email });

    setIsDisabled(true);
  }, [currentUser]);

  useEffect(() => {
    console.log('___')
    if (data.email === currentUser.email || data.name === currentUser.name) {
      setIsDisabled(true);
    }
  }, [data]);

  function handleChangeName(e) {
    setData({ ...data, name: e.target.value });
    if (validateName(e.target.value)) {
      setErrors({ ...errors, name: "" });
    } else {
      setIsDisabled(true);
      setErrors({ ...errors, name: "Имя должно быть корректным" });
    }

    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setData({ ...data, email: e.target.value });
    if (validateEmail(e.target.value)) {
      setErrors({ ...errors, email: "" });
    } else {
      setIsDisabled(true);
      setErrors({ ...errors, email: "E-mail должен быть корректным" });
    }

    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onEditProfile(name, email, setIsSuccess);
  }

  function handleOut(e) {
    e.preventDefault();
    handleSignout();
  }

  function validateEmail(email) {
    const re = /\S+@\S+\.\S+/;

    return re.test(email);
  }

  function validateName(name) {
    const re = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
    return re.test(name);
  }

  React.useEffect(() => {
    console.log("errors", errors);
    console.log("data", data);
    if (errors.name !== "" || errors.email !== "") {
      setIsDisabled(true);
      console.log("1");
    } else if (data.name === "" || data.email === "") {
      console.log("data.name", data.name);
      console.log("data.email", data.email);

      setIsDisabled(true);
      console.log("2");
    } else {
      setIsDisabled(false);
      console.log("3");
    }
    if (data.email === currentUser.email && data.name === currentUser.name) {
      setIsDisabled(true);
      console.log("++++");
      console.log(data.email , currentUser.email)
      console.log(data.name , currentUser.name)
    }
  }, [errors]);

  return (
    <div className="profile-form">
      <h1 className="profile-form__title">Привет, {currentUser.name}!</h1>
      <form className="profile-form__form" onSubmit={handleSubmit}>
        <div className="profile-form__input-container">
          <label className="profile-form__label">Имя</label>
          <input
            className="profile-form__input"
            type="text"
            name="name"
            value={name}
            required
            onChange={handleChangeName}
          />
        </div>

        <div className="profile-form__input-container">
          <label className="profile-form__label">E-mail</label>
          <input
            className="profile-form__input"
            type="email"
            name="email"
            value={email}
            required
            onChange={handleChangeEmail}
          />
        </div>
        {isSuccess ? (
          <button
            className="profile-form__button profile-form__button-success"
            onClick={() => setIsSuccess(false)}
          >
            Успешно!
          </button>
        ) : (
          <button
            className={
              `profile-form__button ` +
              (isDisabled ? "profile-form__button-unactive" : "")
            }
            type="submit"
            disabled={isDisabled}
          >
            Редактировать
          </button>
        )}

        <button
          className="profile-form__button profile-form__button-type-exit"
          onClick={handleOut}
        >
          Выйти из аккаунта
        </button>
      </form>
    </div>
  );
}

export default ProfileForm;
