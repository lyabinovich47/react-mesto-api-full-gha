import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
// import { api } from "../utils/api.js";
import Card from "./Card.js";

function Main({
  onEditAvatar,
  onEditProfile,
  onAddPlace,
  onCardClick,
  onCardDelete,
  cards,
  onCardLike,
  onCardDislike,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
      <section className="profile">
        <div onClick={onEditAvatar} className="profile__avatar-wrap">
          <img
            src={currentUser.avatar}
            alt="аватарка Жак-Ив Кусто"
            className="profile__avatar"
          />
          {/* <div style={{ backgroundImage: `url(${userAvatar})` }} className="profile__avatar"></div> */}
        </div>

        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            onClick={onEditProfile}
            type="button"
            className="profile__edit-button"
          ></button>
          <p className="profile__profession">{currentUser.about}</p>
        </div>
        <button
          onClick={onAddPlace}
          type="button"
          className="profile__add-button"
        ></button>
      </section>

      <section className="cards">
        <ul className="elements">
          {cards.map((item, i) => (
            <Card
              key={item._id}
              onCardClick={onCardClick}
              card={item}
              onCardDelete={onCardDelete}
              onCardLike={onCardLike}
              onCardDislike={onCardDislike}
            />
          ))}
        </ul>
      </section>
    </>
  );
}

export default Main;
