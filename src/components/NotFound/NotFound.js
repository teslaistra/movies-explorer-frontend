import React from "react";
import "./NotFound.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
function NotFound() {

  const history = useHistory();

  return (
    <div className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__text">Страница не найдена</p>

      <div className="not-found__link" onClick={() => history.goBack()}> 
        Назад
      </div>
    </div>
  );
}

export default NotFound;
