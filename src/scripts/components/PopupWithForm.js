import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitFormCallback) {
    super(popupSelector);
    this._submitFormCallback = submitFormCallback;
    this._form = this._popupSelector.querySelector('.popup__form');
    this._inputList = Array.from(this._form.querySelectorAll('.popup__input'));
    this._submitButton = this._form.querySelector('.popup__submit-button');
  }

  //приватный метод, который собирает данные всех полей формы.
  _getInputValues() {
    const inputValues = {};
    this._inputList.forEach(input => {
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  //перезаписанный метод setEventListeners, который добавляет обработчик клика иконке закрытия, и добавляет обработчик сабмита формы.
  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', evt => {
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

/*const profilePopup = new PopupWithForm(document.querySelector('.edit-profile'), handleProfileFormSubmit);
const cardPopup = new PopupWithForm(document.querySelector('.new-place'), handleCardFormSubmit);
const imagePopup = new PopupWithImage(document.querySelector('.image-popup'));

profilePopup.setEventListeners();
cardPopup.setEventListeners();
imagePopup.setEventListeners();
*/
