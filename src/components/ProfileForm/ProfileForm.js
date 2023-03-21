import React from "react";
import "./ProfileForm.css";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ProfileForm({ onEditProfile, handleSignout }) {
  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");

  React.useEffect(() => {
    setName(currentUser.name);
    setEmail(currentUser.email);

  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onEditProfile({
      name,
      email,
    });
  }

  function handleOut(e) {
    e.preventDefault();
    handleSignout();
  }

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

        <button className="profile-form__button" type="submit">
          Редактировать
        </button>
        <button className="profile-form__button profile-form__button-type-exit" onClick={handleOut}>
          Выйти из аккаунта
        </button>
      </form>
    </div>
  );
}

export default ProfileForm;
