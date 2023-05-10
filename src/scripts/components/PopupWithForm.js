import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this._form = this._popupSelector.querySelector('.popup__form');
    this._inputList = this._form.querySelectorAll('.popup__input');
    this._submitButton = this._form.querySelector('.popup__submit');
  }

  //приватный метод, который собирает данные всех полей формы.
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  //метод, который отправляет данные полей на страницу
  setInputValues(data) {
    this._inputList.forEach(input => {
      input.value = data[input.name];
    })
  }


  //перезаписанный метод setEventListeners, который добавляет обработчик клика иконке закрытия, и добавляет обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitFormCallback(this._getInputValues());
      this.close();
    });
  }

  close() {
    this._form.reset();
    super.close();
  }
}
