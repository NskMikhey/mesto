export default class Card {
  constructor(data, cardSelector, openImagePopup) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._openImagePopup = openImagePopup;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    return cardElement;

  }

  //содержит приватные методы, которые работают с разметкой, устанавливают слушателей событий
  _setEventListeners() {
    this._element.querySelector('.card__like').addEventListener('click', () => {
      this._handleLikeIcon();
    });

    this._element.querySelector('.card__remove').addEventListener('click', () => {
      this._handleDeleteIcon();
    });

    this._element.querySelector('.card__image').addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  //содержит приватные методы для каждого обработчика
  _handleLikeIcon() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _handleDeleteIcon() {
    this._element.remove();
  }

  _handleCardClick() {
    this._openImagePopup(this._data);
  }
  //Создание карточек
  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.card__title').textContent = this._data.name;
    this._element.querySelector('.card__image').src = this._data.link;
    this._element.querySelector('.card__image').alt = this._data.name;
    return this._element;
  }
}
