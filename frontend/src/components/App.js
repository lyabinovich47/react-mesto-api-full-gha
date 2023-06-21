import React, { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { api } from "../utils/api.js";
import Header from "./Header";
import Footer from "./Footer";
import Main from "./Main";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import Login from "./Login.js";
import Register from "./Register.js";
import PageNotFound from "./PageNotFound.js";
import InfoTooltip from "./InfoTooltip.js";
import ProtectedRouteElement from "./ProtectedRoute.js";
import { register, login, checkToken } from "../utils/auth.js";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] =
    React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);

  const [selectedCard, setSelectedCard] = React.useState(null);

  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);

  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // стейт успешного логина пользователя

  const [isRegisteredIn, setIsRegisteredIn] = React.useState(false); // стейт успешной регистрации пользователя

  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false); // стейт статуса формы инфы о регистрации пользователя

  const [userEmail, setUserEmail] = React.useState(""); // стейт с почтой пользователя

  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      Promise.all([api.getProfile(), api.getInitialCards()])
        .then(([userData, cardList]) => {
          setCurrentUser(userData);
          setCards(cardList.reverse());
        })
        .catch((err) => {
          console.log(`Ошибка: ${err}`);
        });
    }
  }, [isLoggedIn]);

  const handleRegister = (event, formValue) => {
    event.preventDefault();
    const { email, password } = formValue;
    
    register(email, password)
      .then((data) => {        
        setIsRegisteredIn(true);        
        setIsInfoTooltipOpen(true);   
        navigate("/sign-in", { replace: true });        
      })
      .catch(() => {
        setIsRegisteredIn(false);
        setIsInfoTooltipOpen(true);
      });      
  };

  const handleLogin = (event, formValue) => {
    event.preventDefault();
    const { email, password } = formValue;
    login(email, password)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);        
        navigate("/", { replace: true });
      })
      .catch((err) => {
        setIsRegisteredIn(false);
        setIsInfoTooltipOpen(true);       
        console.log(`Ошибка авторизации пользователя ${err}`);
      });
  };

  React.useEffect(() => {
    if (localStorage.getItem("jwt")) {
      
      checkToken() // убрал jwt из параметра
        .then((data) => {
          setUserEmail(data.email);  // убираем одну data для корректности данных
          setIsLoggedIn(true);
          navigate("/", { replace: true });
        })
        .catch((err) => {
          console.log(`Ошибка проверки валидности токена ${err}`);
        });
    }
  }, [navigate]);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
    setIsInfoTooltipOpen(false);
  }

  const handleCardDelete = (id) => {
    api
      .deleteCard(id)
      .then(() => {
        // const newCards = cards.filter((item) => item._id !== id);
        setCards((prevState) => prevState.filter((item) => item._id !== id));
      })
      .catch(() => {
        console.log("Ошибка запроса удаления карточки");
      });
  };

  const handleCardLike = (id) => {
    api
      .addLike(id)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === id ? newCard : c)));
      })
      .catch(() => {
        console.log("Ошибка запроса добавления лайка карточки");
      });
  };

  const handleCardDislike = (id) => {
    api
      .deleteLike(id)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === id ? newCard : c)));
      })
      .catch(() => {
        console.log("Ошибка запроса удаления лайка карточки");
      });
  };

  function handleUpdateUser(data) {
    const { name, about } = data;
    api
      .editProfile(name, about)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(() => {
        console.log("Ошибка запроса редактирования профиля");
      });
  }

  function handleUpdateAvatar(data) {
    api
      .updateAvatar(data.avatar)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(() => {
        console.log("Ошибка запроса редактирования аватара");
      });
  }

  function handleAddPlaceSubmit(data) {
    const { name, link } = data;
    api
      .addCard(name, link)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(() => {
        console.log("Ошибка запроса добавления карточки");
      });
  }

  function handleSignout() {
    localStorage.removeItem("jwt");
    navigate("/sign-in", { replace: true });
    setIsLoggedIn(false);
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="page">
          <Header email={userEmail} signOut={handleSignout} />

          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRouteElement
                  element={Main}
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onCardClick={handleCardClick}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                  onCardLike={handleCardLike}
                  onCardDislike={handleCardDislike}
                  isOpen={isLoggedIn}
                />
              }
            />
            <Route
              path="/sign-in"
              handleLogin={handleLogin}
              element={<Login onSubmit={handleLogin} />}
            />
            <Route
              path="/sign-up"
              handleRegister={handleRegister}
              element={<Register onSubmit={handleRegister} />}
            />
            <Route
              path="*"
              element={
                isLoggedIn ? <PageNotFound /> : <Navigate to="/sign-in" />
              }
            />
          </Routes>

          <Footer />

          <InfoTooltip
            name="infotooltipForm"
            isOpen={isInfoTooltipOpen}
            isSuccess={isRegisteredIn}
            onClose={closeAllPopups}
          />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser}
          />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onAddPlace={handleAddPlaceSubmit}
          />

          <PopupWithForm
            name="cardDeleteConfirmForm"
            title="Вы уверены?"
            buttonText="Да"
          ></PopupWithForm>

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar}
          />

          <ImagePopup
            card={selectedCard}
            onClose={closeAllPopups}
            onCardClick={handleCardClick}
          />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
