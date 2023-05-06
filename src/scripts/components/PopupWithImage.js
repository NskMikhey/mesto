import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupSelector.querySelector('.popup__image');
    this._popupTitle = this._popupSelector.querySelector('.popup__image-title');
  }

  //перезаписанный метод open, который вставляет в попап картинку с src изображения и подписью к картинке.
  open = (data) => {
    this._popupImage.src = data.link;
    this._popupImage.alt = data.name;
    this._popupTitle.textContent = data.name;
    super.open();
  }
}
