class Popup {
    constructor(popupSelector) {
      this._popup = document.querySelector(popupSelector);
      this._handleEscClose = this._handleEscClose.bind(this);
      this._handleClosePopupwWithOverlay = this._handleClosePopupwWithOverlay.bind(this);
    }
  
    // Private method that close popup window by Escape key.
    _handleEscClose(event) {
      if (event.key === "Escape") {
        this.close();
      }
    }
  
    // Private method that close popup window by clicking on the overlay.
    _handleClosePopupwWithOverlay(event) {
      if (event.target.classList.contains("popup_open")) {
        this.close();
      }
    }
  
    // Public method that adds an event listener to the close icon of the popup.
    setEventListeners() {
      const closeButton = this._popup.querySelector(".popup__close-button");
  
      closeButton.addEventListener("click", () => {
        this.close();
      });
    }
  
    // Public method that open the popup window.
    open() {
      this._popup.classList.add("popup_open");
      document.addEventListener("keydown", this._handleEscClose);
      document.addEventListener("mousedown", this._handleClosePopupwWithOverlay);
    }
  
    // Public method that close the popup window.
    close() {
      this._popup.classList.remove("popup_open");
      document.removeEventListener("keydown", this._handleEscClose);
      document.removeEventListener("mousedown", this._handleClosePopupwWithOverlay);
    }
  }
  
  export default Popup;