export default class Card {
  constructor(data, cardSelector, openImagePopup, openRemoveCard, likeCard, unlikeCard,) {
    this._data = data;
    this._cardId = data._id
    this._cardSelector = cardSelector;
    this._openImagePopup = openImagePopup;
    this._openRemoveCard = openRemoveCard;
    this._myId = data.myId;
    this._ownerId = data.owner._id;
    this._likes = data.likes;
    this._likeCard = likeCard
    this._unlikeCard = unlikeCard

  }

  _updateLikes() {
    this._likes.forEach(element => {
      if (element._id === this._myId) {
        this._likeButton.classList.toggle('card__like_active')
        return
      }
    });
    this._cardLikeCounter.textContent = this._likes.length;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);
    return cardElement;
  }

  //если владелец карточки не является текущим пользователем, то корзины нет
  _visibleTrashBtn() {
    if (this._myId !== this._ownerId) {
      this._removeButton.remove();
    }
  }

  //возвращает наполненный данными элемент карточки
  createCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector('.card__like');
    this._cardImage = this._element.querySelector('.card__image');
    this._cardLikeCounter = this._element.querySelector('.card__like-counter');
    this._removeButton = this._element.querySelector('.card__remove');
    this._cardTitle = this._element.querySelector('.card__title');
    this._visibleTrashBtn();
    this._setEventListeners();
    this._updateLikes();
    this._cardTitle.textContent = this._data.name;
    this._cardImage.src = this._data.link;
    this._cardImage.alt = this._data.name;
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
    this._likeCard(this._cardId)
    // this._likeButton.classList.toggle('card__like_active');
  }

  _handleDeleteIcon() {
    this._openRemoveCard(this)
  }

  _handleCardClick() {
    this._openImagePopup(this._data);
  }
};
