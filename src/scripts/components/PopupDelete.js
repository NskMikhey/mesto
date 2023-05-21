import Popup from './Popup'

export default class PopupDelete extends Popup {
  constructor(popupSelector, removeCard) {
    super(popupSelector)
    this._removeCard = removeCard
    this._yesButton = this._popup.querySelector('.popup__submit')
    this._cardToRemove = null
  }

  open(cardToRemove, identifier) {
    super.open()
    this._cardToRemove = cardToRemove
    this._identifier = identifier
  }

  setEventListeners() {
    super.setEventListeners()
    this._yesButton.addEventListener('click', (evt) => {
      this._removeCard(this._identifier, this._cardToRemove, evt.target)
    })
  }
}
