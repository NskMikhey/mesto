const validationParam = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error_visible',
  spanClass: 'popup__error_type_',
};
//инициализирует объекты формы и вызывает функцию setEventListeners()
//для каждого элемента формы.
const enableValidation = (config) => {
  const formElements = Array.from(document.querySelectorAll(validationParam.formSelector));
  formElements.forEach((formElement) => {
    setEventListeners(formElement, validationParam.inputSelector, validationParam.submitButtonSelector, validationParam.inactiveButtonClass, validationParam.inputErrorClass, validationParam.errorClass, validationParam.spanClass);
  });
};
enableValidation(validationParam);

//показывает сообщение об ошибке у конкретного поля и добавляет классы стилей.
const showInputError = (formElement, inputElement, errorMessage, spanClass, errorClass, inputErrorClass) => {
  const errorElement = formElement.querySelector(`.${spanClass}${inputElement.id}`);
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(errorClass);
};
//скрывает сообщение об ошибке у конкретного поля и удаляет классы стилей.
const hideInputError = (formElement, inputElement, spanClass, errorClass, inputErrorClass) => {
  const errorElement = formElement.querySelector(`.${spanClass}${inputElement.id}`);
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
};
//проверяет валидность конкретного поля и управляет показом/скрытием сообщения об ошибке.
const checkInputValidity = (formElement, inputElement, spanClass, errorClass, inputErrorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, spanClass, errorClass, inputErrorClass);
  } else {
    hideInputError(formElement, inputElement, spanClass, errorClass, inputErrorClass);
  }
};
//переключает состояние кнопки отправки формы и управляет ее активностью.
function toggleButtonState (buttonElement, isActive, inactiveButtonClass) {
  if (isActive) {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  } else {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  }
};
//устанавливает обработчики событий для каждого поля формы.
function setEventListeners (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, spanClass) {
  const inputElements = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  toggleButtonState(buttonElement, formElement.checkValidity(), inactiveButtonClass);
  inputElements.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, spanClass, errorClass, inputErrorClass);
      toggleButtonState(buttonElement, formElement.checkValidity(), inactiveButtonClass);
    });
  });
};
//сбрасывает ошибки валидации
const resetValidation = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass, spanClass) => {
  const inputElements = Array.from(formElement.querySelectorAll(inputSelector));
  const buttonElement = formElement.querySelector(submitButtonSelector);
  inputElements.forEach((inputElement) =>{
    hideInputError(formElement, inputElement, spanClass, errorClass, inputErrorClass);
    toggleButtonState(buttonElement, false, inactiveButtonClass);
  });
};

