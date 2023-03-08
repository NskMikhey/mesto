const popupElement = document.querySelector('.popup');
const popupCloseButtonElement = popupElement.querySelector('.popup__close-button');
const popupOpenButtonElement = document.querySelector('.profile__edit-button');

const openPopupVisibility = function () {
  popupElement.classList.add('popup_is-opened')
};

const closePopup = function () {
  popupElement.classList.remove('popup_is-opened')
};

popupOpenButtonElement.addEventListener('click', openPopupVisibility);
popupCloseButtonElement.addEventListener('click', closePopup);

