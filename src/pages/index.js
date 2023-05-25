import './index.css';
import {
  validationParam,
  initialCards,
  cardSelector,
  editForm,
  cardCreator,
  buttonOpenAddCardPopup,
  buttonOpenEditProfilePopup,
  cardContainerSelector,
  editAvatar,
  avatarEditBtn
} from "../scripts/utils/constants.js";
import Card from "../scripts/components/Card.js";
import FormValidator from "../scripts/components/FormValidator.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import Section from "../scripts/components/Section.js";
import UserInfo from "../scripts/components/UserInfo.js";
import PopupDelete from '../scripts/components/PopupDelete.js';
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

Array.from(document.forms).forEach(formElement => {
  const form = new FormValidator(validationParam, formElement)
  const name = formElement.name;
  formValidators[name] = form;
  form.enableValidation()
})

//Экземпляр профиля пользователя
const userInfo = new UserInfo({
  nameSelector: ".profile__name",
  aboutSelector: ".profile__about",
  profileAvatar: ".profile__avatar"
});

//Экземпляр картинки
const imagePopup = new PopupWithImage('.image-popup');
imagePopup.setEventListeners();

//Удаление карточки
const popupRemoveCard = new PopupDelete('.delete-popup', (element) => {
  element.deleteCard();
  popupRemoveCard.close()
})
popupRemoveCard.setEventListeners()


//создание карточек при загрузке страницы
function createNewCard(element) {
  const article = new Card(element,
    cardSelector,
    imagePopup.open,
    popupRemoveCard.open);
  return article.createCard();
}

const initialCardList = new Section((element) => {
  initialCardList.addItem(createNewCard(element))
}, cardContainerSelector);

initialCardList.renderItems(initialCards);

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

//-----------------------ПР9------------------------------------------------------------------------------------

Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([dataUser, dataCard]) => {
    const { name: name, about: about, _id, avatar } = dataUser
    userInfo.setUserInfo({ name, about, _id, avatar });
    dataCard.forEach(element => element.cardId = dataUser._id);
    initialCardList.renderItems(dataCard);
  })
  .catch(console.error)

//Аватар
const handleAvatarEditSubmit = ({ 'profile-avatar': avatar }, submitBtn) => {
  api
    .setUserAvatar(avatar)
    .then((result) => {
      userInfo.setUserInfo(result)
      avatarEditPopup.close()
    })
    .catch(console.error);
}
//Экземпляр формы редактирования аватара
const avatarEditPopup = new PopupWithForm(
  '.avatar-popup',
  handleAvatarEditSubmit,
  editAvatar,
)
avatarEditPopup.setEventListeners()

const openAvatarPopup = () => {
  formValidators[editAvatar.name].resetValidation()
  avatarEditPopup.open()
}

avatarEditBtn.addEventListener('click', openAvatarPopup);

//Трэш

//------------------------------------------------------------------------------------------------------------

