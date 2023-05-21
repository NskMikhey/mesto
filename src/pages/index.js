import './index.css';
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
//import PopupDelete from '../scripts/components/PopupDelete.js';
import Api from '../scripts/components/Api.js';


const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '438e2072-cb3f-42a1-8236-431af52821e6',
    'Content-Type': 'application/json',
  },
})

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
  aboutSelector: ".profile__about",
  profileAvatar: ".profile__avatar-photo"
});

//Экземпляр картинки
const imagePopup = new PopupWithImage('.image-popup');
imagePopup.setEventListeners();

//-----------------------ПР9------------------------------------------------------------------------------------
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([dataUser, dataCard]) => {
    const { name: name, about: about, _id, avatar } = dataUser
    userInfo.setUserInfo({ name, about, _id, avatar })
    console.log(dataCard)
  })
  .catch(console.error)

function createNewCard(element) {
  const article = new Card(element, cardSelector, imagePopup.open);
  return article.createCard();
}
//------------------------------------------------------------------------------------------------------------
//создание карточек при загрузке страницы
const initialCardList = new Section({
  items: initialCards,
  renderer: (element) => {
    initialCardList.addItem(createNewCard(element))
  },
},
  cardContainerSelector);

initialCardList.renderItems();

//Форма редактирования места
const cardPopup = new PopupWithForm('.new-place',
  (data) => {
    initialCardList.addItem(createNewCard(data));
  });
cardPopup.setEventListeners();

//Слушатель на добавление карточки
buttonOpenAddCardPopup.addEventListener('click', () => {
  formValidators[cardCreator.name].resetValidation()
  cardPopup.open()
})

//Форма редактирования профиля
const profilePopup = new PopupWithForm('.edit-profile',
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


