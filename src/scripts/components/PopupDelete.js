import Popup from './Popup.js'

export default class PopupDelete extends Popup {
  constructor(popupSelector, removeCard) {
    super(popupSelector)
    this._removeCard = removeCard
    this._form = this._popupElement.querySelector('.popup__form');
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
      this._removeCard({ card: this._element, cardId: this._cardId });
    })
  }

  close() {
    super.close();
    this._element = null;
  }
}
