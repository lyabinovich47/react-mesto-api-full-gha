// компонент должен защищать компонент Main от попадания неавторизованных пользователей.
// авторизованный пользователь увидит Main, неавторизованный - будет перекинут на страницу авторизации
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRouteElement = ({ element: Component, ...props }) => {
  return props.isOpen ? (
    <Component {...props} />
  ) : (
    <Navigate to="/sign-in" replace />
  );
};

export default ProtectedRouteElement;
