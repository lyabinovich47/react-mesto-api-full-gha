class Api {

  constructor({ baseUrl }) {

    // this._headers = headers;
    this._baseUrl = baseUrl;
    this._ResJson = (res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Что-то пошло не так: ${res.status}`);
    };

  }

  getProfile() {

    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${token}`,
      }
    })
      .then(this._ResJson);

  }

  getInitialCards() {

    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards`, {
      headers: {
        authorization: `Bearer ${token}`,
      }
    })
      .then(this._ResJson);

  }

  editProfile(name, about) {

    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._ResJson);

  }

  addCard(name, link) {

    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then(this._ResJson);

  }

  deleteCard(id) {

    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
      }
    })
      .then(this._ResJson);

  }

  deleteLike(id) {

    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(this._ResJson);

  }

  addLike(id) {

    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: 'PUT',
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }
    })
      .then(this._ResJson);

  }

  updateAvatar(newAvatar) {

    const token = localStorage.getItem('jwt');
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        avatar: newAvatar
      })
    })
      .then(this._ResJson);

  }

}

export const api = new Api({
  baseUrl: 'http://localhost:3000',
  // headers: {
  //   authorization: 'a68b3d82-1603-42e3-8955-1f9a3567159b',
  //   'Content-Type': 'application/json'
  // }
});