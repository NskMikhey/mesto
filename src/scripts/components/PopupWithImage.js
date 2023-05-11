import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popupElement.querySelector('.popup__image');
    this._popupTitle = this._popupElement.querySelector('.popup__image-title');
  }

  //перезаписанный метод open, который вставляет в попап картинку с src изображения и подписью к картинке.
  open = (data) => {
    this._popupImage.src = data.link;
    this._popupImage.alt = data.title;
    this._popupTitle.textContent = data.title;
    super.open();
  }
}
