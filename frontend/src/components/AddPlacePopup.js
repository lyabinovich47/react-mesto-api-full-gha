import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const [name, setName] = React.useState("");
  const [link, setLink] = React.useState("");

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: name,
      link: link,
    });
  }

  React.useEffect(() => {
    setName("");
    setLink("");
  }, [isOpen]);

  return (
    <PopupWithForm
      name="cardAddForm"
      title="Новое место"
      buttonText="Создать"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          id="title-input"
          name="elementTitle"
          type="text"
          placeholder="Название"
          className="popup__text popup__text_type_element-title"
          minLength="2"
          maxLength="30"
          required
          value={name || ""}
          onChange={handleChangeName}
        />
        <span className="title-input-error popup__text-error"></span>
      </label>

      <label className="popup__form-field">
        <input
          id="url-input"
          name="elementUrl"
          type="url"
          placeholder="Ссылка на картинку"
          className="popup__text popup__text_type_element-url"
          required
          value={link || ""}
          onChange={handleChangeLink}
        />
        <span className="url-input-error popup__text-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
