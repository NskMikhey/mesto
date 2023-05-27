const editForm = document.forms['profileContent'];
const cardCreator = document.forms['newPlaceForm'];
const editAvatar = document.forms['editAvatar'];
//Кнопка редактирования профиля
const buttonOpenEditProfilePopup = document.querySelector('.profile__edit-button');
//Кнопка открытия попапа карточек
const buttonOpenAddCardPopup = document.querySelector('.profile__add-button');
//Кнопка открытия попапа аватара
const avatarEditBtn = document.querySelector('.profile__edit-avatar-button')
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
  editForm,
  cardCreator,
  buttonOpenAddCardPopup,
  buttonOpenEditProfilePopup,
  cardSelector,
  cardContainerSelector,
  editAvatar,
  avatarEditBtn
}
