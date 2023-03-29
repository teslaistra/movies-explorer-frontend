import React from "react";
import "./Header.css";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Logo from "../../images/logo.svg";
import user from "../../images/user.svg";
import BurgerMenu from "../BurgerMenu/BurgerMenu";

function Header({ loggedIn }) {
  const isStartPage = useLocation().pathname === "/";
  return (
    <header
      className={`header ${
        !isStartPage ? "header_theme_gray" : "header_theme_green"
      }`}
    >
      <div className="header__container">
        <Link to="/" className="header__logo">
          <img className="header__logo-image" src={Logo} alt="логотип" />
        </Link>

        {!isStartPage ? <Navigation /> : null}

        <div className="header__user-buttons">
          {!loggedIn ? (
            <>
              <Link to="/signup" className="header__button">
                Регистрация
              </Link>
              <Link
                to="/signin"
                className="header__button header__button_style_green"
              >
                Войти
              </Link>
            </>
          ) : (
            <div className="header__menu">
              <>
                <>
                  <Link
                    to="/movies"
                    className={`header__button header__button-film ${ !isStartPage ? "header__button_position_start" : ""}`}
                  >
                    Фильмы
                  </Link>
                  <Link
                    to="/saved-movies"
                    className={`header__button header__button-film ${ !isStartPage ? "header__button_position_start" : ""}`}
                  >
                    Сохраненные фильмы
                  </Link>
                  <Link
                    to="/profile"
                    className={`header__button header__button-user ${ isStartPage ? "header__button-user_position_start" : ""}`}
                  >
                                        {isStartPage ? null : <span className="header__user-name">Аккаунт</span>}

                    <div className={`header__profile-icon ${ isStartPage ? "header__profile-icon_position_start" : ""}`}>
                      <img
                        className="header__profile-image"
                        src={user}
                        alt="user"
                      />
                    </div>
                    {!isStartPage ? null : <span className="header__user-name">Аккаунт</span>}
                    
                  </Link>
                </>
              </>
              <BurgerMenu />
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
