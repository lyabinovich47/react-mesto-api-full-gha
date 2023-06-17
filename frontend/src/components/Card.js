import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardDelete, onCardLike, onCardDislike }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const cardLikeButtonClassName = `element__like-btn ${
    isLiked && "element__like-btn_active"
  }`;

  function handleClick() {
    onCardClick(card);
  }

  function handleDelete() {
    onCardDelete(card._id);
  }

  function handleLike() {
    isLiked ? onCardDislike(card._id) : onCardLike(card._id);
  }

  return (
    <li className="element">
      <img
        onClick={handleClick}
        src={card.link}
        alt={card.name}
        className="element__photo"
      />
      {isOwn && (
        <button
          onClick={handleDelete}
          className="element__delete-btn"
          type="button"
        ></button>
      )}
      <div className="element__group">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-group">
          <button
            onClick={handleLike}
            className={cardLikeButtonClassName}
            type="button"
          ></button>
          <span className="element__like-count">{card.likes.length}</span>
        </div>
      </div>
    </li>
  );
}

export default Card;
