const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

const editForm = document.forms['profileContent'];
const cardCreator = document.forms['newPlaceForm'];
//Кнопка редактирования профиля
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
//Кнопка открытия попапа карточек
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
//массив с карточками
const cardSelector = '.card-template';
const cardContainerSelector = '.elements';

// объект с настройками валидалии
const validationParam = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error_visible',
  spanClass: 'popup__error_type_',
};

export {
  validationParam,
  initialCards,
  editForm,
  cardCreator,
  buttonOpenAddCardPopup,
  buttonOpenEditProfilePopup,
  cardSelector,
  cardContainerSelector
}
