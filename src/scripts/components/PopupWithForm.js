import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this._form = this._popupElement.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitBtn = this._popupElement.querySelector('.popup__submit');
    this._defaultText = this._submitBtn.textContent;
  }

  //приватный метод, который собирает данные всех полей формы.
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  //отправляет данные полей на страницу
  setInputValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name];
    })
  }


  //добавляет обработчик клика иконке закрытия, и добавляет обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitBtn.textContent = `${this._defaultText}...`
      this._submitFormCallback(this._getInputValues());
    });
  }

  close() {
    this._form.reset();
    super.close();
  }

  renderLoading() {
    this._submitBtn.textContent = this._defaultText;
  }
}
