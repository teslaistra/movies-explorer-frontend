import React from "react";
import Navigation from "../Navigation/Navigation";
import "./BurgerMenu.css";
import user from "../../images/user.svg";
import { Link } from "react-router-dom";
import close from "../../images/close.svg";

function BurgerMenu() {
  const [isBurgerMenuOpened, setIsBurgerMenuOpened] = React.useState(false);

  function burgerMenuOpen() {
    setIsBurgerMenuOpened(true);
  }

  function burgerMenuClose() {
    setIsBurgerMenuOpened(false);
  }

  return (
    <div className="burger-menu">
      <div className="burger-menu__container" onClick={burgerMenuOpen}>
        <div className="burger-menu__line"></div>
        <div className="burger-menu__line"></div>
        <div className="burger-menu__line"></div>
      </div>

      <div
        className={`burger-menu__screen  ${
          isBurgerMenuOpened && "burger__sreen_opened"
        }`}
      >
        <div className="burger-menu__close" onClick={burgerMenuClose}>
          <img className="burger-menu__close-image" src={close} alt="закрыть" />
        </div>

        <ul className="burger-menu__list">
          <li className="burger-menu__list-item">
            <Link className="burger-menu__link" to="/">
              Главная
            </Link>
          </li>
          <li className="burger-menu__list-item">
            <Link className="burger-menu__link" to="/movies">
              Фильмы
            </Link>
          </li>
          <li className="burger-menu__list-item">
            <Link className="burger-menu__link" to="/saved-movies">
              Сохранённые фильмы
            </Link>
          </li>
          <li className="burger-menu__list-item burger-menu__list-item-user">
            <Link to="/profile" className="burger-menu__button-user">
              Аккаунт
              <div className="burger-menu__profile-icon">
                <img
                  className="burger-menu__profile-image"
                  src={user}
                  alt="user"
                />
              </div>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default BurgerMenu;
