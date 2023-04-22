import initialCards from "./components.js";
const popups = Array.from(document.querySelectorAll('.popup'));
//Объявил Профиль попап
const profilePopup = document.querySelector('.edit-profile');
const editForm = document.forms['profileContent'];
//Объявил Новое место
const cardPopup = document.querySelector('.new-place');
const addForm = document.forms['newPlaceForm'];
//Объявил Открыть фото
const imagePopup = document.querySelector('.image-popup');
const popupImage = imagePopup.querySelector('.popup__image');
const popupTitle = imagePopup.querySelector('.popup__image-title');
//Переменные форм
const nameProfile = document.querySelector('.profile__name');
const aboutProfile = document.querySelector('.profile__about');
//Переменные инпутов профиля
const nameInput = profilePopup.querySelector('.popup__input_type_name');
const aboutInput = profilePopup.querySelector('.popup__input_type_about');
//Переменные инпутов места
const placeTitle = cardPopup.querySelector('.popup__input_place_title');
const placePhoto = cardPopup.querySelector('.popup__input_place_description');
//Кнопки
const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const exitButtons = document.querySelectorAll('.popup__close-button');

//массив с карточками
const cardContainer = document.querySelector('.elements');
const cardSelector = '.card-template';

//Ф-я открытия попапа, добавить прослушиватель на ESC
const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
  window.addEventListener('keydown', closePopupClickingOnEscape);
};

//Ф-я закрытия попапа
const closePopup = () => {
  document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
  window.removeEventListener('keydown', closePopupClickingOnEscape)
};

//Открыть попап профиля, сбросить ошибки валидатора
const showProfilePopup = () => {
  nameInput.value = nameProfile.textContent;
  aboutInput.value = aboutProfile.textContent;
  openPopup(profilePopup);
  //const editFormValidator = new FormValidator(validationParam, editForm);
  //editFormValidator.resetValidation();
};

//Открыть попап нового места, сбросить ошибки валидатора
const showAddPopup = () => {
  openPopup(cardPopup);
  addForm.reset();
  //const addFormValidator = new FormValidator(validationParam, addForm);
  //addFormValidator.resetValidation();
};

const openImagePopup = (data) => {
  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupTitle.textContent = data.name;
  openPopup(imagePopup);
};

//Слушатели на открытие форм
editButton.addEventListener('click', showProfilePopup);
addButton.addEventListener('click', showAddPopup);

//Закрыть попап на Esc
const closePopupClickingOnEscape = (evt) => {
  if (evt.key === 'Escape') closePopup(popups.find((popup) => popup.classList.contains('popup_is-opened')))
}

//Закрыть попап кликом на оверлей
const closePopupClickingOnOverlay = (evt) => {
  if (evt.target !== evt.currentTarget) return;
  closePopup(evt.currentTarget);
}

//Слушатель на оверлей
popups.forEach((popup) => popup.addEventListener('click', closePopupClickingOnOverlay));

//Слушатель на закрытие
exitButtons.forEach((exit) => exit.addEventListener('click', () => closePopup(exit.closest('.popup'))));

//Создание карточек
class Card {
  constructor(data, cardSelector) {
    this._data = data;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    return cardElement;

  }

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

  _handleLikeIcon() {
    this._element.querySelector('.card__like').classList.toggle('card__like_active');
  }

  _handleDeleteIcon() {
    this._element.remove();
  }

  _handleCardClick() {
    openImagePopup(this._data);
  }

  createCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    this._element.querySelector('.card__title').textContent = this._data.name;
    this._element.querySelector('.card__image').src = this._data.link;
    this._element.querySelector('.card__image').alt = this._data.name;
    return this._element;
  }
}
//Поле с карточками
initialCards.forEach((item) => {
  const card = new Card(item, cardSelector).createCard();
  cardContainer.appendChild(card);
});


//События в форме профиля
const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  aboutProfile.textContent = aboutInput.value;
  closePopup();
};

//События в форме места
const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  const newPlace = { name: placeTitle.value, link: placePhoto.value };
  cardContainer.prepend(new Card(newPlace, cardSelector).createCard());
  evt.target.reset();
  closePopup();
};

//Слушатели на события в формах
editForm.addEventListener('submit', handleProfileFormSubmit);
addForm.addEventListener('submit', handleCardFormSubmit);
