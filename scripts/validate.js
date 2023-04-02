//
const ValidationParam = {
  allForms: document.forms,
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit_disabled',
  errorSelectorTemplate: '.popup__error_type_',
  inputErrorClass: 'popup__input_invalid',
  errorClass: 'popup__error_visible'
};

const log = console.log;

enableValidation(ValidationParam);

function enableValidation(param) {

}
