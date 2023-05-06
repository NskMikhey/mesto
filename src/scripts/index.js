import {
  validationParam,
  initialCards,
  cardSelector,
  cardContainer,
  addForm,
  cardCreator,
  buttonOpenAddCardPopup,
  buttonOpenEditProfilePopup
} from "./utils/constants.js";
import Card from "./components/Card.js";
import FormValidator from "./components/FormValidator.js";
import PopupWithForm from "./components/PopupWithForm.js";
import PopupWithImage from "./components/PopupWithImage.js";
import Section from "./components/Section.js";
import UserInfo from "./components/UserInfo.js";

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
  infoSelector: ".profile__about"
});

//Экземпляр картинки
const imagePopup = new PopupWithImage(document.querySelector('.image-popup'));
imagePopup.setEventListeners();

//Открыть зум-попап картинки
const openImagePopup = (name, link) => {
  imagePopup.open(name, link)
};

//Поле с карточками
const createNewCard = (element) => {
  const article = new Card(element, cardSelector, openImagePopup);
  const articleElement = article.createCard();
  return articleElement;
}
//Добавление карточки в контейнер
const addCard = (element) => {
  const article = createNewCard(element);
  cardContainer.prepend(article);
}

//создание карточек при загрузке страницы
const initialCardList = new Section(
  {
    items: initialCards,
    renderer: addCard,
  },
  '.elements',
);

initialCardList.renderItems();

//Форма редактирования места
const handleCardFormSubmit = ({ 'place-title': name, 'place-description': link }) => {
  addCard({ name, link })
  formValidators[cardCreator.name].resetValidation();
  cardPopup.close()
}

const cardPopup = new PopupWithForm(document.querySelector('.new-place'), handleCardFormSubmit);
cardPopup.setEventListeners()


//Форма редактирования профиля
const handleProfileFormSubmit = (data) => {
  userInfo.setUserInfo(data);
  profilePopup.close()
}

const profilePopup = new PopupWithForm(document.querySelector('.edit-profile'), handleProfileFormSubmit);
profilePopup.setEventListeners()

//Слушатель на профиль
buttonOpenEditProfilePopup.addEventListener('click', () => {
  const data = userInfo.getUserInfo()
  profilePopup.setInputValues(data)
  formValidators[addForm.name].resetValidation()
  profilePopup.open()
})

//Слушатель на добавление карточки
buttonOpenAddCardPopup.addEventListener('click', () => {
  formValidators[cardCreator.name].resetValidation()
  cardPopup.open()
})
