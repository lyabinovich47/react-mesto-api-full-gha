import React from "react";

function Login({ onSubmit }) {
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
    onSubmit(e, formValue, setFormValue);
  }

  return (
    <div className="logreg__container">
      <h3 className="logreg__title">Вход</h3>
      <form className="logreg__form" name="loginForm" onSubmit={handleSubmit}>
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
        <button type="submit" className="logreg__submite-btn">
          Войти
        </button>
      </form>
    </div>
  );
}

export default Login;
