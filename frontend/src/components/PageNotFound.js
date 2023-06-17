import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="not-found__container">
      <h3 className="not-found__title">404 - Страница не найдена</h3>
      <Link className="not-found__link-to-back" to="/">
        Назад
      </Link>
    </div>
  );
}

export default PageNotFound;
