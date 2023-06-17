import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: inputRef.current.value,
    });
  }

  React.useEffect(() => {
    inputRef.current.value = "";
  }, [isOpen]);

  return (
    <PopupWithForm
      name="avatarNewForm"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label className="popup__form-field">
        <input
          id="urll-input"
          name="avatar"
          type="url"
          placeholder="Ссылка на картинку"
          className="popup__text popup__text_type_element-url"
          required
          ref={inputRef}
        />
        <span className="urll-input-error popup__text-error"></span>
      </label>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
