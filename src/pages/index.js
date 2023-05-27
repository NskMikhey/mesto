import './index.css';
import {
  validationParam,
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

//Экземпляр API
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-66',
  headers: {
    authorization: '438e2072-cb3f-42a1-8236-431af52821e6',
    'Content-Type': 'application/json',
  },
})

//получение данных пользователя и массива карточек
Promise.all([api.getUserData(), api.getInitialCards()])
  .then(([dataUser, dataCard]) => {
    const { name: name, about: about, _id, avatar } = dataUser
    userInfo.setUserInfo({ name, about, _id, avatar });
    dataCard.forEach(element => element.myId = dataUser._id);
    initialCardList.renderItems(dataCard);
  })
  .catch(console.error)

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

//Экземпляр зум-картинки
const imagePopup = new PopupWithImage('.image-popup');
imagePopup.setEventListeners();

//Экземпляр popup удаления карточки
const popupRemoveCard = new PopupDelete('.delete-popup', ({ card, cardId }) => {
  api
    .removeCard(cardId)
    .then(() => {
      card.deleteCard()
      popupRemoveCard.close()
    })
    .catch(console.error)
})
popupRemoveCard.setEventListeners()

//Аватар
const handleAvatarEditSubmit = ({ 'profile-avatar': avatar }) => {
  api
    .setUserAvatar(avatar)
    .then(res => {
      userInfo.setUserInfo(res)
      avatarEditPopup.close()
    })
    .catch(console.error)
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

//Форма редактирования профиля
const profilePopup = new PopupWithForm('.edit-profile',
  (data) => {
    api
      .setUserData(data)
      .then(({ name: name, about: about, ...res }) => {
        userInfo.setUserInfo({ name, about, ...res })
        profilePopup.close()
      })
      .catch(console.error)
  });
profilePopup.setEventListeners();

//Слушатель на профиль
buttonOpenEditProfilePopup.addEventListener('click', () => {
  profilePopup.setInputValues(userInfo.getUserInfo())
  formValidators[editForm.name].resetValidation()
  profilePopup.open()
})

//Создает экземпляры карточек
function createNewCard(element) {
  const article = new Card(element,
    cardSelector,
    imagePopup.open,
    popupRemoveCard.open,
    (likeButton, cardId) => {
      if (likeButton.classList.contains('card__like_active')) {
        api
          .unlikeCard(cardId)
          .then(res => {
            article.isLike(res.likes)
          })
          .catch(console.error)
      } else {
        api
          .likeCard(cardId)
          .then(res => {
            article.isLike(res.likes)
          })
          .catch(console.error)
      }
    });
  return article.createCard();
}

//Создает новую секцию для галереи
const initialCardList = new Section((element) => {
  initialCardList.addItem(createNewCard(element))
}, cardContainerSelector);

//Экземпляр формы добавления карточки
const cardPopup = new PopupWithForm('.new-place',
  (data) => {
    Promise.all([api.getUserData(), api.addNewCard(data)])
      .then(([dataUser, dataCard]) => {
        dataCard.myId = dataUser._id;
        initialCardList.addNewItem(createNewCard(dataCard))
        cardPopup.close()
      })
      .catch(console.error)
  });
cardPopup.setEventListeners();

//Слушатель на добавление карточки
buttonOpenAddCardPopup.addEventListener('click', () => {
  formValidators[cardCreator.name].resetValidation()
  cardPopup.open()
})
