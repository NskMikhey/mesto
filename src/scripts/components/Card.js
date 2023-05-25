export default class Card {
  constructor(data, cardSelector, openImagePopup, openRemoveCard) {
    this._data = data;
    this._cardSelector = cardSelector;
    this._openImagePopup = openImagePopup;
    this._openRemoveCard = openRemoveCard;
  }
  // constructor({item, currentUser, handleCardClick, handleDeleteCard, handleLikeCard}, cardTemplateSelector) {
  //   this._cardId = item._id;
  //   this._name = item.name;
  //   this._link = item.link;
  //   this._likes = item.likes;
  //   this._ownerId = item.owner._id;
  //   this._cardElement = cardTemplateSelector;
  //   this._handleCardClick = handleCardClick;
  //   this._handleDeleteCard = handleDeleteCard;
  //   this._handleLikeCard = handleLikeCard;
  //   this._currentUser = currentUser;
  // }
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
    this._cardTitle.textContent = this._data.title;
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.title;
    return this._element;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
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
    this._likeButton.classList.toggle('card__like_active');
  }

  _handleDeleteIcon() {
    this._openRemoveCard(this)
  }

  _handleCardClick() {
    this._openImagePopup(this._data);
  }
};
