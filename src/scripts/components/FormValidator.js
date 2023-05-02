//объект настроек с селекторами и классами формы;
class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._spanClass = config.spanClass;
    this._form = form;
    this._inputElements = Array.from(this._form.querySelectorAll(this._inputSelector));
    this._buttonElement = this._form.querySelector(this._submitButtonSelector);
  }

  //показывает сообщение об ошибке у конкретного поля и добавляет классы стилей.
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${this._spanClass}${inputElement.id}`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  //скрывает сообщение об ошибке у конкретного поля и удаляет классы стилей.
  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${this._spanClass}${inputElement.id}`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  //проверяет валидность конкретного поля и управляет показом/скрытием сообщения об ошибке.
  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  //переключает состояние кнопки отправки формы и управляет ее активностью.
  _toggleButtonState(isActive) {
    if (isActive) {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    } else {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    }
  }

  //устанавливает обработчики событий для каждого поля формы.
  _setEventListeners() {
    this._toggleButtonState(this._form.checkValidity());
    this._inputElements.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(this._form.checkValidity());
      });
    });
  }

  //публичный метод который включает валидацию формы
  enableValidation() {
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  //публичный метод который выключает валидацию формы
  resetValidation() {
    this._inputElements.forEach((inputElement) => {
      this._hideInputError(inputElement);
      this._toggleButtonState(false);
    });
  }
}

export default FormValidator;
