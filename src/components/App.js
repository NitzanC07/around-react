import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWIthForm.js';
import PopupWithImage from './PopupWithImage.js';
import { useState } from 'react';

//** This the main file of the application.  */
function App() {

    const [isEditProfilePopupOpen, setStateEditProfilePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setStateEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setStateAddPlacePopupOpen] = useState(false);
    const [isDeleteCardPopupOpen, setStateDeleteCardPopupOpen] = useState(false);
    const [isImagePopupOpen, setStateImagePopupOpen] = useState(false)

    function closeAllPopups() {
        setStateEditProfilePopupOpen(false);
        setStateEditAvatarPopupOpen(false);
        setStateAddPlacePopupOpen(false);
        setStateDeleteCardPopupOpen(false);
        setStateImagePopupOpen(false);
        document.removeEventListener("keyup", handleEscClose);
        document.removeEventListener("mouseup", handleClosePopupwWithOverlay);
    }

    function handleEscClose(evt) {
        if (evt.key === "Escape") {
            closeAllPopups();
        }
    }

    function handleClosePopupwWithOverlay(evt) {
        if (evt.target.classList.contains("popup_open")) {
            closeAllPopups();
        }
      }
    
    function handleEditProfileClick() {
        setStateEditProfilePopupOpen(!isEditProfilePopupOpen);
        document.addEventListener("keyup", handleEscClose);
        document.addEventListener("mouseup", handleClosePopupwWithOverlay);
    }
    
    function handleEditAvatarClick() {
        setStateEditAvatarPopupOpen(true);
        document.addEventListener("keyup", handleEscClose);
        document.addEventListener("mouseup", handleClosePopupwWithOverlay);
    }
    
    function handleAddPlaceClick() {
        setStateAddPlacePopupOpen(true);
        document.addEventListener("keyup", handleEscClose);
        document.addEventListener("mouseup", handleClosePopupwWithOverlay);
    }

    function handleImageClick() {
        console.log("Card was clicked!")
        setStateImagePopupOpen(true);
        document.addEventListener("keyup", handleEscClose);
        document.addEventListener("mouseup", handleClosePopupwWithOverlay);
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log('Submited', e.target);
        setStateEditProfilePopupOpen(false);
        closeAllPopups();
    }

    return (
        <div className="page">
        
            <div className="page__container">
                <Header />
                <Main 
                    onEditProfileClick={handleEditProfileClick}
                    isEditProfilePopupOpen={isEditProfilePopupOpen}
                    onAddPlaceClick={handleAddPlaceClick}
                    isAddPlacePopupOpen={isAddPlacePopupOpen}
                    onEditAvatarClick={handleEditAvatarClick}
                    isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                    onCardClick={handleImageClick}
                    isImagePopupOpen={isImagePopupOpen}
                    />
                <Footer />

                <PopupWithImage className="popup popup_type_image" isOpen={isImagePopupOpen ? 'popup_open' : ''} onClose={closeAllPopups} />

                <PopupWithForm name='edit-profile' title='Edit Profile' isOpen={isEditProfilePopupOpen ? 'popup_open' : ''} onClose={closeAllPopups}>
                    <form className="popup__form popup__form_profile" name="edit-profile" onSubmit={submitHandler} noValidate>
                        <label className="popup__field">
                            <input type="text" className="popup__input popup__input_content_name" id="input-name" name="name" placeholder="What is your name" minLength="2" maxLength="40" required />
                            <span className="input-name-error"></span>
                        </label>
                        <label className="popup__field">
                            <input type="text" className="popup__input popup__input_content_description" id="inputAbout" name="about" placeholder="Describe your role" minLength="2" maxLength="200" required />
                            <span className="input-about-error"></span>
                        </label>
                        <button className="popup__submit-button popup__submit-button_profile" type="submit">Save</button>
                    </form>
                </PopupWithForm>

                <PopupWithForm name='add-card' title='New Place' isOpen={isAddPlacePopupOpen ? 'popup_open' : ''} onClose={closeAllPopups}>
                    <form className="popup__form popup__form_addCard" name="add-place" onSubmit={submitHandler} noValidate>
                        <label className="popup__field">
                            <input type="text" className="popup__input popup__input_type_title" id="input-title" name="name" placeholder="Title" minLength="1" maxLength="30" required />
                            <span className="input-title-error"></span>
                        </label>
                        <label className="popup__field">
                            <input type="url" className="popup__input popup__input_type_image" id="input-image" name="link" placeholder="Image URL" required />
                            <span className="input-image-error"></span>
                        </label>
                        <button className="popup__submit-button popup__submit-button_card" type="submit">Save</button>
                    </form>
                </PopupWithForm>

                <PopupWithForm name='avatar' title='Change Profile Picture' isOpen={isEditAvatarPopupOpen ? 'popup_open' : ''} onClose={closeAllPopups}>
                    <form className="popup__form popup__form_avatar" name="avatar" onSubmit={submitHandler} noValidate>
                        <label className="popup__field">
                            <input type="url" className="popup__input popup__input_type_avatar" id="inputAvatar" name="avatar" placeholder="Image URL" required />
                            <span className="input-avatar-error"></span>
                        </label>
                        <button className="popup__submit-button popup__submit-button_avatar" type="submit">Save</button>
                    </form>
                </PopupWithForm>

                <PopupWithForm name='delete-card' title='Are you Sure?' isOpen={isDeleteCardPopupOpen ? 'popup_open' : ''}>
                    <div className="popup__container">
                        <button className="popup__close-button popup__close-button_card" type="button"></button>
                        <form className="popup__form popup__form_add-card" name="delete-card" onSubmit={submitHandler} noValidate>
                            <button className="popup__submit-button popup__submit-button_card" type="submit">Yes</button>
                        </form>
                    </div>
                </PopupWithForm>
            </div>
        </div>
    );
}

export default App;