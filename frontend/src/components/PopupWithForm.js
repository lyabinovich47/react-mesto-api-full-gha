import React from "react";

function PopupWithForm({
  name,
  title,
  children,
  buttonText = "Сохранить",
  isOpen,
  onClose,
  onSubmit,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && "popup_opened"}`}>
      <form
        className={`popup__container popup__container_type_${name}`}
        name={name}
        // noValidate
        onSubmit={onSubmit}
      >
        <button
          onClick={onClose}
          className="popup__close-button"
          type="button"
        ></button>

        <h2 className="popup__title">{title}</h2>

        {children}

        <button type="submit" className="popup__submite-btn">
          {buttonText}
        </button>
      </form>
    </div>
  );
}

export default PopupWithForm;
