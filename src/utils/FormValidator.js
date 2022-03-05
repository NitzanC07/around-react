// Sprint 7 - project Live Coding, Liza - time on video: 0:00 - 40:00 mins.

class FormValidator {
    constructor(settings, formElement) {
      this._settings = settings;
      this._formElement = formElement;
      this._inputsList = Array.from(this._formElement.querySelectorAll(settings.inputSelector));
      this._button = this._formElement.querySelector(settings.submitButtonSelector);
    }
  
    _showErrorMessage(input, errorMessage) {
      const { inputErrorClass, errorClass } = this._settings;
      this._errorElement = this._formElement.querySelector(`.${input.id}-error`);
      this._errorElement.textContent = errorMessage;
      this._errorElement.classList.add(inputErrorClass);
      input.classList.add(errorClass);
    }
  
    _hideErrorMessage(input) {
      const { inputErrorClass, errorClass } = this._settings;
      this._errorElement = this._formElement.querySelector(`.${input.id}-error`);
      this._errorElement.textContent = "";
      this._errorElement.classList.remove(inputErrorClass);
      input.classList.remove(errorClass);
    }
  
    _checkInputValidity(input) {
      if (!input.validity.valid) {
        const errorMessage = input.validationMessage;
        this._showErrorMessage(input, errorMessage);
      } else {
        this._hideErrorMessage(input);
      }
    }
  
    _toggleButtonState() {
      const { inactiveButtonClass } = this._settings;
      const isFormInvalid = this._inputsList.some(
        (inputElement) => !inputElement.validity.valid
      );
      if (!isFormInvalid) {
        this._button.classList.remove(inactiveButtonClass);
        this._button.removeAttribute("disabled");
      } else {
        this._button.classList.add(inactiveButtonClass);
        this._button.setAttribute("disabled", true);
      }
    }
  
    _setEventListeners() {
      this._inputsList.forEach((inputElement) => {
        inputElement.addEventListener("input", () => {
          this._checkInputValidity(inputElement);
          this._toggleButtonState();
        });
      });
    }
  
    enableValidation() {
      this._formElement.addEventListener("submit", (evt) => {});
      this._setEventListeners();
    }
  
    resetValidation() {
      this._toggleButtonState();
      this._inputsList.forEach((inputElement) => {
        this._hideErrorMessage(inputElement);
      });
    }
  }
  
  export default FormValidator;
  