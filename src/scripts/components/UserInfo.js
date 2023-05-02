export default class UserInfo {
  constructor({nameSelector, aboutSelector}) {
    this._name = document.querySelector(nameSelector);
    this._about = document.querySelector(aboutSelector);
  }

  //возвращает объект с данными пользователя
  getUserInfo() {
    return { name: this._name.textContent, about: this._about.textContent };
  }

  //принимает новые данные пользователя и добавляет их на страницу
  setUserInfo({name, about}) {
    this._name.textContent = name;
    this._about.textContent = about;
  }
}
