export default class UserInfo {
  constructor({ nameSelector, aboutSelector, profileAvatar }) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
    this._avatar = document.querySelector(profileAvatar);
  }

  //получает информацию о пользователе из разметки
  getUserInfo() {
    return { name: this._name.textContent, about: this._about.textContent, avatar: this._avatar.src };
  }

  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({ name, about, avatar }) {
    this._name.textContent = name;
    this._about.textContent = about;
    this._avatar.src = avatar;
  }
  setId(id) {
    this._id = id;
  }
  getId() {
    return this._id;
  }
}
