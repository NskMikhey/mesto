/*const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');
const nameProfile = document.querySelector('.profile__name');
const aboutProfile = document.querySelector('.profile__about');
const nameInput = popupElement.querySelector('.popup__input_type_name');
const aboutInput = popupElement.querySelector('.popup__input_type_about');
const formElement = popupElement.querySelector('.popup__container');*/

const popups = document.querySelectorAll('.popup');
//Объявил Профиль попап
const profilePopup = document.querySelector('.edit-profile');
const editForm = document.forms['profileContent'];

//Объявил Новое место
const cardPopup = document.querySelector('.new-place');
const addForm = document.forms['newPlaceForm'];

//Объявил Открыть фото
const imagePopup = document.querySelector('.image-popup');
const popupImage = document.querySelector('.popup__image');
const popupImageCaption = document.querySelector('.popup__image-title');
// Переменные форм
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

//Добавить класс откр попап
const openPopup = (popup) => {
  popup.classList.add('popup_is-opened');
};
//Открыть попап профиля
const showProfilePopup = () => {
  nameInput.value = nameProfile.textContent;
  aboutInput.value = aboutProfile.textContent;
  openPopup(profilePopup);
};
//Открыть попап нового места
const showAddPopup = () => {
  openPopup(cardPopup);
};
//Открыть попап картинки
const showImagePopup = (name, link) => {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageCaption.textContent = name;
  openPopup(imagePopup);
};
//Слушатели на открытие
editButton.addEventListener('click', showProfilePopup);
addButton.addEventListener('click', showAddPopup);

/*const openPopup = function () {
  popupElement.classList.add('popup_is-opened');
  nameInput.value = nameProfile.textContent;
  aboutInput.value = aboutProfile.textContent;
};

const closePopup = function () {
  popupElement.classList.remove('popup_is-opened');
};

const handleFormSubmit = function (evt) {
  evt.preventDefault();
  nameProfile.textContent = nameInput.value;
  aboutProfile.textContent = aboutInput.value;
  closePopup();
}

popupOpenButtonElement.addEventListener('click', openPopup);
popupCloseButtonElement.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);*/

//массив с карточками
const cardContainer = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card-template').content;
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

function createCard(data) {
  const card = cardTemplate.cloneNode(true);
  const img = card.querySelector('.card__image');
  const place = card.querySelector('.card__title');
  const like = card.querySelector('.card__like');
  const trash = card.querySelector('.card__remove');

  place.textContent = data.name;
    img.src = data.link;
    img.alt = data.name;

    return card;
  }

  initialCards.forEach(elem => {
    cardContainer.append(createCard(elem));
  });
