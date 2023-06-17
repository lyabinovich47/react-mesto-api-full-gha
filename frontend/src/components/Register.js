import React from "react";
import { Link } from "react-router-dom";

function Register({ onSubmit }) {
  const [formValue, setFormValue] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValue({
      ...formValue,
      [name]: value,
    });
  };

  function handleSubmit(e) {
    onSubmit(e, formValue);
  }

  return (
    <div className="logreg__container">
      <h3 className="logreg__title">Регистрация</h3>
      <form
        className="logreg__form"
        name="registerForm"
        onSubmit={handleSubmit}
      >
        <input
          className="logreg__input"
          name="email"
          type="email"
          value={formValue.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          className="logreg__input"
          name="password"
          type="password"
          value={formValue.password}
          onChange={handleChange}
          placeholder="Пароль"
        />
        <button className="logreg__submite-btn" type="submit">
          Зарегистрироваться
        </button>
      </form>
      <Link to="/sign-in" className="logreg__link-to-log">
        Уже зарегистрированы? Войти
      </Link>
    </div>
  );
}

export default Register;
