import Popup from './Popup.js'

export default class PopupDelete extends Popup {
  constructor(popupSelector, removeCard) {
    super(popupSelector)
    this._removeCard = removeCard
    this._form = this._popupElement.querySelector('.popup__form');
  }

  open = (element) => {
    super.open();
    console.log(element)
    this._element = element;

  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._removeCard();
      this.close();
    })
  }
  close() {
    super.close();
    this._element = null;
  }
}
