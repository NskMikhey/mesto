export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl
    this._headers = options.headers
  }

  /** возвращает ответ / ошибку после выполнения промиса */
  _handlePromiseReturn(res) {
    if (res.ok) {
      return res.json()
    }
    return Promise.reject(`Ошибка ${res.status} ${res.statusText}`)
  }

  /** Работа с данными пользователя */
  //Получает инфо о пользователе с сервера
  getUserData() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._handlePromiseReturn)
  }
  //Отправляет инфо о пользователе на сервер
  setUserData(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: '438e2072-cb3f-42a1-8236-431af52821e6',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._handlePromiseReturn)
  }
  //Обновляет аватар пользователя на сервере
  setUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then(this._handlePromiseReturn)
  }

  // Работа с карточками
  //Получает карточки с сервера
  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'GET',
      headers: this._headers,
    }).then(this._handlePromiseReturn)
  }
  //Отправляет данные о новой карточке на сервер
  addNewCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: data.title,
        link: data.link
      }),
    }).then(this._handlePromiseReturn)
  }
  //Ставит лайк
  likeCard(identifier) {
    return fetch(`${this._baseUrl}/cards/${identifier}/likes`, {
      method: 'PUT',
      headers: this._headers,
    }).then(this._handlePromiseReturn)
  }
  //Удаляет лайк
  unlikeCard(identifier) {
    return fetch(`${this._baseUrl}/cards/${identifier}/likes`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._handlePromiseReturn)
  }
  //Удаляет карточку с сервера
  removeCard(identifier) {
    return fetch(`${this._baseUrl}/cards/${identifier}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then(this._handlePromiseReturn)
  }
}
