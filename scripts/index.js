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
const cardTemplate = document.querySelector('.card-template').content;

//Ф-я открытия попапа, добавить прослушиватель на ESC
const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
  window.addEventListener('keydown', closePopupClickingOnEscape);
};

//Ф-я закрытия попапа
const closePopup = () => {
  document.querySelector('.popup_is-opened').classList.remove('popup_is-opened');
  const openedPopup = document.querySelector(".popup_is-opened");
  if (openedPopup) {
    openedPopup.classList.remove("popup_is-opened");
  }
  window.removeEventListener('keydown', closePopupClickingOnEscape)
};

//Открыть попап профиля, сбросить ошибки валидатора
const showProfilePopup = () => {
  nameInput.value = nameProfile.textContent;
  aboutInput.value = aboutProfile.textContent;
  openPopup(profilePopup);
  resetValidation(editForm, validationParam.inputSelector, validationParam.submitButtonSelector, validationParam.inactiveButtonClass, validationParam.inputErrorClass, validationParam.errorClass, validationParam.spanClass);
};

//Открыть попап нового места, сбросить ошибки валидатора
const showAddPopup = () => {
  openPopup(cardPopup);
  addForm.reset();
  resetValidation(addForm, validationParam.inputSelector, validationParam.submitButtonSelector, validationParam.inactiveButtonClass, validationParam.inputErrorClass, validationParam.errorClass, validationParam.spanClass);
};

//Слушатели на открытие форм
editButton.addEventListener('click', showProfilePopup);
addButton.addEventListener('click', showAddPopup);

//Закрыть попап на Esc
const closePopupClickingOnEscape = (evt) => {
  if (evt.key === "Escape") closePopup();
}

//Закрыть попап кликом на оверлей
const closePopupClickingOnOverlay = (evt) => {
  if (evt.target !== evt.currentTarget) return;
  closePopup();
}

//Слушатель на оверлей
popups.forEach((popup) => popup.addEventListener('click', closePopupClickingOnOverlay));

//Слушатель на закрытие
exitButtons.forEach((exit) => exit.addEventListener("click", closePopup));

//Создание карточек
function createCard(data) {
  const card = cardTemplate.cloneNode(true);
  const img = card.querySelector('.card__image');
  const place = card.querySelector('.card__title');
  place.textContent = data.name;
  img.src = data.link;
  img.alt = data.name;
  const like = card.querySelector('.card__like');
  const trash = card.querySelector('.card__remove');

  //Cлушатель на Лайк
  like.addEventListener('click', () => {
    like.classList.toggle('card__like_active');
  });

  //Cлушатель на зум фото
  img.addEventListener('click', () => {
    popupImage.src = data.link;
    popupImage.alt = data.name;
    popupTitle.textContent = data.name;
    openPopup(imagePopup);
  });

  //Cлушатель на корзину
  trash.addEventListener('click', (evt) => {
    evt.target.closest('.card').remove();
  });

  return card;
}

initialCards.forEach(elem => {
  cardContainer.append(createCard(elem));
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
  cardContainer.prepend(createCard(newPlace));
  evt.target.reset();
  closePopup();
};

//Слушатели на события в формах
editForm.addEventListener('submit', handleProfileFormSubmit);
addForm.addEventListener('submit', handleCardFormSubmit);
