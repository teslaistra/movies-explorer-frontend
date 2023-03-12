import React from "react";
import "./ProfileForm.css";

function ProfileForm() {
  return (
    <div className="profile-form">
      <h1 className="profile-form__title">Привет, Виталий!</h1>
      <form className="profile-form__form">
        <div className="profile-form__input-container">
          <label className="profile-form__label">Имя</label>
          <input
            className="profile-form__input"
            type="text"
            name="name"
            placeholder="Виталий"
            required
          />
        </div>
        <div className="profile-form__input-container">
          <label className="profile-form__label">E-mail</label>
          <input
            className="profile-form__input"
            type="email"
            name="email"
            placeholder="pochta@yandex.ru"
            required
          />
        </div>

        <button className="profile-form__button" type="submit">
          Редактировать
        </button>
        <button className="profile-form__button profile-form__button-type-exit">
          Выйти из аккаунта
        </button>
      </form>
    </div>
  );
}

export default ProfileForm;
