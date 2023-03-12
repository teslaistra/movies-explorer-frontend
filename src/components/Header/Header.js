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
                <Link to="/profile" className="header__button header__button-user">
                  Аккаунт
                
              <div className="header__profile-icon">
                <img className="header__profile-image" src={user} alt="user" />
              </div>
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
