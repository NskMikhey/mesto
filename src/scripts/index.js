import {
  initialCards,
  validationParam
} from "./utils/constants.js";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";

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

//создать экземпляр класса валидатора, включить валидацию формы.
const editFormValidator = new FormValidator(validationParam, editForm);
editFormValidator.enableValidation();
const addFormValidator = new FormValidator(validationParam, addForm);
addFormValidator.enableValidation();

//Открыть попап профиля, сбросить ошибки валидатора
const showProfilePopup = () => {
  nameInput.value = nameProfile.textContent;
  aboutInput.value = aboutProfile.textContent;
  openPopup(profilePopup);
  editFormValidator.resetValidation();
};

//Открыть попап нового места, сбросить ошибки валидатора
const showAddPopup = () => {
  openPopup(cardPopup);
  addForm.reset();
  addFormValidator.resetValidation();
};

//Открыть зум-попап картинки
const openImagePopup = (data) => {
  popupImage.src = data.link;
  popupImage.alt = data.name;
  popupTitle.textContent = data.name;
  openPopup(imagePopup);
};

//Слушатели на открытие форм
editButton.addEventListener('click', showProfilePopup);
addButton.addEventListener('click', showAddPopup);

//Поле с карточками
const createNewCard = (element) => {
  const article = new Card(element, cardSelector, openImagePopup);
  const articleElement = article.createCard();
  return articleElement;
}

const addCard = (element) => {
  const article = createNewCard(element)
  cardContainer.prepend(article);
}
//создание карточек при загрузке страницы
initialCards.forEach(addCard);

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
popups.forEach((popup) => popup.addEventListener('mousedown', closePopupClickingOnOverlay));

//Слушатель на закрытие попапа
exitButtons.forEach((exit) => exit.addEventListener('click', () => closePopup(exit.closest('.popup'))));

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
  addCard(newPlace);
  evt.target.reset();
  closePopup();
};

//Слушатели на события в формах
editForm.addEventListener('submit', handleProfileFormSubmit);
addForm.addEventListener('submit', handleCardFormSubmit);
