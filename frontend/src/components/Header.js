import React from "react";
import logoPath from "../images/icons/logo.svg";
import { Routes, Route, Link } from "react-router-dom";

function Header({ email, signOut }) {
  return (
    <header className="header">
      <img
        className="header__logo"
        src={logoPath}
        alt="логотип проекта Место"
      />
      <Routes>
        <Route
          path="/"
          element={
            <div className="header__wrapper">
              <p className="header__user-email">{email}</p>
              <button className="header__logout-btn" onClick={signOut}>
                Выйти
              </button>
            </div>
          }
        />
        <Route
          path="/sign-up"
          element={
            <Link className="header__auth-link" to="/sign-in">
              Войти
            </Link>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Link className="header__auth-link" to="/sign-up">
              Регистрация
            </Link>
          }
        />
        <Route path="*" element={""} />
      </Routes>
    </header>
  );
}

export default Header;
