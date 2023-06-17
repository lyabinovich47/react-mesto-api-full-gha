class Api {

  constructor({ baseUrl, headers }) {

    this._headers = headers;
    this._baseUrl = baseUrl;
    this._ResJson = (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    };

  }

  getProfile() {

    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers
    })
      .then(this._ResJson);

  }

  getInitialCards() {

    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers
    })
      .then(this._ResJson);

  }

  editProfile(name, about) {

    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._ResJson);

  }

  addCard(name, link) {

    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this._ResJson);

  }

  deleteCard(id) {

    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._ResJson);

  }

  deleteLike(id) {

    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this._headers
    })
      .then(this._ResJson);

  }

  addLike(id) {

    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this._headers
    })
      .then(this._ResJson);

  }

  updateAvatar(newAvatar) {

    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        avatar: newAvatar
      })
    })
      .then(this._ResJson);

  }

}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-57',
  headers: {
    authorization: 'a68b3d82-1603-42e3-8955-1f9a3567159b',
    'Content-Type': 'application/json'
  }
});