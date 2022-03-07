import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import Card from './Card.js';
import PopupWithForm from './PopupWIthForm.js';
import PopupWithImage from './PopupWithImage.js';
import api from '../utils/api.js';
import FormValidator from '../utils/FormValidator.js';
import React, { useState, useEffect } from 'react';
import { config } from '../utils/constants.js';

//** This the main file of the application.  */
function App() {

    const [isEditProfilePopupOpen, setStateEditProfilePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setStateEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setStateAddPlacePopupOpen] = useState(false);
    const [isDeleteCardPopupOpen, setStateDeleteCardPopupOpen] = useState(false);
    const [isImagePopupOpen, setStateImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({})
        
    // Enable validation
    const formValidators = {}
    const enableValidation = (config) => {
        const formList = Array.from(document.querySelectorAll(config.formSelector))
        formList.forEach((formElement) => {
            const validator = new FormValidator(config, formElement)
            // Create the name of the form
            const formName = formElement.getAttribute('name')
        
            // Store a validator by the `name` of the form
            formValidators[formName] = validator
            validator.enableValidation();
        });
    };
    enableValidation(config);
    
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
            console.log(evt);
            closeAllPopups();
        }
    }

    function handleClosePopupwWithOverlay(evt) {
        if (evt.target.classList.contains("popup_open")) {
            closeAllPopups();
        }
    }

    function getInputsValues(specificForm) {
        const inputsValues = {};
        const inputs = Array.from(specificForm.querySelectorAll(".popup__input"))
        inputs.forEach(input => {
            inputsValues[input.name] = input.value;
        })
        return inputsValues
    }
    
    function handleImageClick(card) {
        // console.log("Card was clicked!", card);
        setSelectedCard(card)
        setStateImagePopupOpen(true);
        document.addEventListener("keyup", handleEscClose);
        document.addEventListener("mouseup", handleClosePopupwWithOverlay);
    }

    /** Methods for user details. */
    function handleEditProfileClick() {
        setStateEditProfilePopupOpen(true);
        console.log(formValidators["edit-profile"]);
        formValidators["edit-profile"].resetValidation();
        document.addEventListener("keyup", handleEscClose);
        document.addEventListener("mouseup", handleClosePopupwWithOverlay);
        document.querySelector(".popup__input_content_name").value = document.querySelector(".profile__name").textContent;
        document.querySelector(".popup__input_content_description").value = document.querySelector(".profile__description").textContent;
    }

    const submitHandlerEditProfile = (form) => {
        form.preventDefault();
        const profileData = getInputsValues(form.target);
        api.setUserInfo(profileData)
            .then((formContent) => {
                console.log("Response", formContent);
                // document.querySelector(".popup__input_content_name").textContent = formContent.name;
                // document.querySelector(".popup__input_content_description").textContent = formContent.about;
            })
            .catch(err => 
                console.log("Error:", err)
            );
        closeAllPopups();
    }

    /** Methods for cahnging avatar (profile picture) */
    function handleEditAvatarClick() {
        setStateEditAvatarPopupOpen(true);
        console.log(formValidators["avatar"]);
        formValidators["avatar"].resetValidation();
        document.addEventListener("keyup", handleEscClose);
        document.addEventListener("mouseup", handleClosePopupwWithOverlay);
    }

    const submitHandlerAvatar = (form) => {
        form.preventDefault();
        // console.log("Submitted!!!", form.target);
        const newAvatar = getInputsValues(form.target);
        console.log(newAvatar);
        api.changeAvatar(newAvatar)
        .then((formContent) => {
            console.log("Response:", formContent);
            // document.querySelector(".profile__avatar-picture").src = formContent.avatar;
        })
        .catch(err => 
            console.log("Error:", err)
        );
        closeAllPopups()
    }

    function HandleLikeCard(cardId, userId, likesArray, props) {
        console.log(props.card.likes);
        if (!likesArray.find(user => user._id === userId)) {
            console.log("Card liked!!!", cardId, userId, likesArray)
            api.likeCard(cardId)
                .then((res) => {
                    console.log("Response (added like for card):", res.likes);
                })
                .catch(err => 
                    console.log("Error:", err)
                );
        } else {
            console.log("Card disliked!!!", cardId, userId, likesArray)
            api.dislikeCard(cardId)
            .then((res) => {
                console.log("Response (removed like from card):", res.likes);
            })
            .catch(err => 
                console.log("Error:", err)
            );
        }
    }

    function handleDeleteCard(card) {
        setStateDeleteCardPopupOpen(true);
        setSelectedCard(card)
        document.addEventListener("keyup", handleEscClose);
        document.addEventListener("mouseup", handleClosePopupwWithOverlay);
    }

    const submitDeleteCard = (form) => {
        form.preventDefault();
        api.deleteCard(selectedCard._id)
            .then((res) => {
                console.log("Card deleted!!!", res)
                console.log(selectedCard);
            })
            .catch(err => 
                console.log("Error:", err)
            );
        closeAllPopups();
    }
    
    /** Methods for adding new card. */
    function handleAddPlaceClick() {
        setStateAddPlacePopupOpen(true);
        console.log(formValidators["add-card"]);
        // formValidators["add-card"].resetValidation();
        document.addEventListener("keyup", handleEscClose);
        document.addEventListener("mouseup", handleClosePopupwWithOverlay);
    }

    const submitHandlerAddCard = (form) => {
        form.preventDefault();
        console.log("Submitted!!!", form.target);
        const newCard = getInputsValues(form.target);
        console.log(newCard);
        api.createCard(newCard)
            .then((res) => {
                console.log("Response:", res);
                <Card 
                    card={res} 
                    key={res._id} 
                    id={res._id} 
                    userId={res.owner._id} 
                    name={res.name}
                    link={res.link}
                    onCardClick={handleImageClick}
                    deleteCard={handleDeleteCard}
                    likeCard={HandleLikeCard}
                />
                console.log("Response", res);
                // document.querySelector(".cards__container").prepend(newCard);
            })
            .catch(err => 
                console.log("Error:", err)
            );
        closeAllPopups()
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
                    deleteCard={handleDeleteCard}
                    likeCard={HandleLikeCard}
                    />
                <Footer />

                <PopupWithImage 
                    className="popup popup_type_image" 
                    isOpen={isImagePopupOpen ? 'popup_open' : ''} 
                    onClose={closeAllPopups} 
                    cardData={selectedCard}
                />

                <PopupWithForm name='edit-profile' title='Edit Profile' isOpen={isEditProfilePopupOpen ? 'popup_open' : ''} onClose={closeAllPopups}>
                    <form className="popup__form popup__form_profile" name="edit-profile" onSubmit={submitHandlerEditProfile} noValidate>
                        <label className="popup__field">
                            <input type="text" className="popup__input popup__input_content_name" id="input-name" name="name" placeholder="What is your name" minLength="2" maxLength="40" required />
                            <span className="input-name-error"></span>
                        </label>
                        <label className="popup__field">
                            <input type="text" className="popup__input popup__input_content_description" id="input-about" name="about" placeholder="Describe your role" minLength="2" maxLength="200" required />
                            <span className="input-about-error"></span>
                        </label>
                        <button className="popup__submit-button popup__submit-button_profile" type="submit">Save</button>
                    </form>
                </PopupWithForm>

                <PopupWithForm name='add-card' title='New Place' isOpen={isAddPlacePopupOpen ? 'popup_open' : ''} onClose={closeAllPopups}>
                    <form className="popup__form popup__form_add-card" name="add-card" onSubmit={submitHandlerAddCard} noValidate>
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
                    <form className="popup__form popup__form_avatar" name="avatar" onSubmit={submitHandlerAvatar} noValidate>
                        <label className="popup__field">
                            <input type="url" className="popup__input popup__input_type_avatar" id="input-avatar" name="avatar" placeholder="Image URL" required />
                            <span className="input-avatar-error"></span>
                        </label>
                        <button className="popup__submit-button popup__submit-button_avatar" type="submit">Save</button>
                    </form>
                </PopupWithForm>

                <PopupWithForm name='delete-card' title='Are you Sure?' isOpen={isDeleteCardPopupOpen ? 'popup_open' : ''} onClose={closeAllPopups}>
                    <form className="popup__form popup__form_delete-card" name="delete-card" onSubmit={submitDeleteCard} noValidate>
                        <button className="popup__submit-button popup__submit-button_card" type="submit">Yes</button>
                    </form>
                </PopupWithForm>
            </div>
        </div>
    );
}

export default App;