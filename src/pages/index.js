import {
  validationParam,
  initialCards,
  cardSelector,
  editForm,
  cardCreator,
  buttonOpenAddCardPopup,
  buttonOpenEditProfilePopup,
  cardContainerSelector
} from "../scripts/utils/constants.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";

//Создать экземпляр класса валидатора, включить валидацию формы.
const formValidators = {}

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector))

  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement)

    const { name } = formElement

    formValidators[name] = validator
    validator.enableValidation()
  })
}

enableValidation(validationParam);

//Экземпляр профиля пользователя
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about"
});

//Экземпляр картинки
const imagePopup = new PopupWithImage(document.querySelector('.image-popup'));
imagePopup.setEventListeners();

//создание карточек при загрузке страницы
const initialCardList = new Section({
  items: initialCards,
  renderer: (element) => {
    const article = new Card(element, cardSelector, imagePopup.open);
    return article.createCard();
  },
},
  cardContainerSelector);

initialCardList.renderItems();

//Форма редактирования места
const cardPopup = new PopupWithForm(document.querySelector('.new-place'),
  (data) => {
    initialCardList.addItem(data);
  });
cardPopup.setEventListeners();

//Слушатель на добавление карточки
buttonOpenAddCardPopup.addEventListener('click', () => {
  formValidators[cardCreator.name].resetValidation()
  cardPopup.open()
})

//Форма редактирования профиля
const profilePopup = new PopupWithForm(document.querySelector('.edit-profile'),
  (data) => {
    userInfo.setUserInfo(data);
  });
profilePopup.setEventListeners();

//Слушатель на профиль
buttonOpenEditProfilePopup.addEventListener('click', () => {
  profilePopup.setInputValues(userInfo.getUserInfo())
  formValidators[editForm.name].resetValidation()
  profilePopup.open()
})
