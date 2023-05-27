import Popup from './Popup.js'

export default class PopupDelete extends Popup {
  constructor(popupSelector, removeCard) {
    super(popupSelector)
    this._removeCard = removeCard
    this._form = this._popupElement.querySelector('.popup__form');
    this._submitBtn = this._popupElement.querySelector('.popup__submit');
    this._defaultText = this._submitBtn.textContent;
  }

  open = ({ cardId, card }) => {
    super.open();
    this._cardId = cardId;
    this._element = card;

  }

  setEventListeners() {
    super.setEventListeners()
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitBtn.textContent = `${this._defaultText}...`
      this._removeCard({ card: this._element, cardId: this._cardId });
    })
  }

  renderLoading() {
    this._submitBtn.textContent = this._defaultText;
  }

  close() {
    super.close();
    this._element = null;
  }
}
