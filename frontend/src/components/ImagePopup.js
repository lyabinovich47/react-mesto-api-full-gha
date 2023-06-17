import React from "react";

function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_type_big-photo ${card && "popup_opened"}`}>
      <figure className="popup__big-photo-container">
        <img src={card?.link} alt={card?.name} className="popup__big-photo" />
        <button
          onClick={onClose}
          className="popup__close-button"
          type="button"
        ></button>
        <figcaption className="popup__big-photo-title">{card?.name}</figcaption>
      </figure>
    </div>
  );
}

export default ImagePopup;
