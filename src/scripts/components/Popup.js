export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupSelector.classList.add('popup_is-opened');
    window.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popupSelector.classList.remove('popup_is-opened');
    window.removeEventListener('keydown', this._handleEscClose);
  }

  //метод, который добавляет слушатель клика иконке закрытия попапа, а также закрывает окно при оверлее
  setEventListeners() {
    this._popupSelector.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup__close-button') ||
        evt.target.classList.contains('popup')) {
        this.close();
      }
    });
  }

  //метод, который содержит логику закрытия попапа клавишей Esc
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }
  }
}
