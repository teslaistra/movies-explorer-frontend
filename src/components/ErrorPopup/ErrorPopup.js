import React from "react";
import "./ErrorPopup.css";

function ErrorPopup({ isOpen, onClose }) {
    return (
        <div className={`error-popup ${isOpen && "error-popup_opened"}`}>
        <div className="error-popup__container">
            <p className="error-popup__text">Что-то пошло не так :(</p>
            <button className="error-popup__button" onClick={onClose}>
            Закрыть
            </button>
        </div>
        </div>
    );
    }

    export default ErrorPopup;
