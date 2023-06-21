import React from "react";
import pathSuccess from "../images/icons/success.png";
import pathFail from "../images/icons/fail.png";

function InfoTooltip({ name, isOpen, isSuccess, onClose }) {
  const titleSuccess = "Вы успешно зарегистрировались!";
  const titleFail = "Что-то пошло не так! Попробуйте ещё раз.";
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <form
        name={name}
        className={`popup__container popup__container_type_${name}`}
      >
        <button
          className="popup__close-button"
          onClick={onClose}
          type="button"
        ></button>
        <img
          src={isSuccess ? pathSuccess : pathFail}          
          className="popup__image"
          alt=""
        />
        <h3 className={`popup__title popup__title_type_${name}`}>
          {isSuccess ? titleSuccess : titleFail}       
        </h3>        
      </form>
    </div>
  );
}

export default InfoTooltip;
