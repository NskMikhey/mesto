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

  //метод, который возвращает полностью работоспособный и наполненный данными элемент карточки
  createCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.card__like');
    this._cardImage = this._element.querySelector('.card__image');
    this._removeButton = this._element.querySelector('.card__remove');
    this._cardTitle = this._element.querySelector('.card__title');
    this._setEventListeners();
    this._cardTitle.textContent = this._data.name;
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
    return this._element;
  }

  //приватные методы, которые работают с разметкой, устанавливают слушателей событий
  _setEventListeners() {
    this._likeButton.addEventListener('click', () => {
      this._handleLikeIcon();
    });

    this._removeButton.addEventListener('click', () => {
      this._handleDeleteIcon();
    });

    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });
  }

  //приватные методы для каждого обработчика
  _handleLikeIcon() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _handleDeleteIcon() {
    this._element.remove();
    this._element = null;
  }

  _handleCardClick() {
    this._openImagePopup(this._data);
  }
};
