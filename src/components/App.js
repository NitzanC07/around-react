import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import Card from './Card.js';
import PopupWithForm from './PopupWIthForm.js';
import ImagePopup from './ImagePopup.js';
import api from '../utils/api.js';
import React, { useState, useEffect } from 'react';

//** This the main file of the application.  */
function App() {

    const [isEditProfilePopupOpen, setStateEditProfilePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setStateEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setStateAddPlacePopupOpen] = useState(false);
    const [isDeleteCardPopupOpen, setStateDeleteCardPopupOpen] = useState(false);
    const [isImagePopupOpen, setStateImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({})
        
    function closeAllPopups() {
        setStateEditProfilePopupOpen(false);
        setStateEditAvatarPopupOpen(false);
        setStateAddPlacePopupOpen(false);
        setStateDeleteCardPopupOpen(false);
        setStateImagePopupOpen(false);
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
        setSelectedCard(card)
        setStateImagePopupOpen(true);
    }

    /** Methods for user details. */
    function handleEditProfileClick() {
        setStateEditProfilePopupOpen(true);
    }

    const submitHandlerEditProfile = (form) => {
        form.preventDefault();
        const profileData = getInputsValues(form.target);
        api.setUserInfo(profileData)
            .then((formContent) => {
                console.log("Response", formContent);
            })
            .catch(err => 
                console.log("Error:", err)
            );
        closeAllPopups();
    }

    /** Methods for cahnging avatar (profile picture) */
    function handleEditAvatarClick() {
        setStateEditAvatarPopupOpen(true);
    }

    const submitHandlerAvatar = (form) => {
        form.preventDefault();
        const newAvatar = getInputsValues(form.target);
        console.log(newAvatar);
        api.changeAvatar(newAvatar)
        .then((formContent) => {
            console.log("Response:", formContent);
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
    }

    const submitHandlerDeleteCard = (form) => {
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

                <ImagePopup 
                    className="popup popup_type_image" 
                    isOpen={isImagePopupOpen ? 'popup_open' : ''} 
                    onClose={closeAllPopups} 
                    selectedCard={selectedCard}
                />

                <PopupWithForm 
                    name='edit-profile' 
                    title='Edit Profile' 
                    isOpen={isEditProfilePopupOpen ? 'popup_open' : ''} 
                    onClose={closeAllPopups} 
                    buttonText="Save" 
                    submitHandler={submitHandlerEditProfile}
                >
                    <label className="popup__field">
                        <input 
                            type="text" 
                            className="popup__input popup__input_content_name" 
                            id="input-name" 
                            name="name" 
                            placeholder="What is your name" 
                            minLength="2" 
                            maxLength="40" 
                            required 
                        />
                        <span className="input-name-error"></span>
                    </label>
                    <label className="popup__field">
                        <input 
                            type="text" 
                            className="popup__input popup__input_content_description" 
                            id="input-about" 
                            name="about" 
                            placeholder="Describe your role" 
                            minLength="2" 
                            maxLength="200" 
                            required 
                        />
                        <span className="input-about-error"></span>
                    </label>
                </PopupWithForm>

                <PopupWithForm 
                    name='add-card' 
                    title='New Place' 
                    isOpen={isAddPlacePopupOpen ? 'popup_open' : ''} 
                    onClose={closeAllPopups} 
                    buttonText="Save" 
                    submitHandler={submitHandlerAddCard}
                >
                    <label className="popup__field">
                        <input 
                            type="text" 
                            className="popup__input popup__input_type_title" 
                            id="input-title" 
                            name="name" 
                            placeholder="Title" 
                            minLength="1" 
                            maxLength="30" 
                            required 
                        />
                        <span className="input-title-error"></span>
                    </label>
                    <label className="popup__field">
                        <input 
                            type="url" 
                            className="popup__input popup__input_type_image" 
                            id="input-image" 
                            name="link" 
                            placeholder="Image URL" 
                            required 
                        />
                        <span className="input-image-error"></span>
                    </label>
                </PopupWithForm>

                <PopupWithForm 
                    name='avatar' 
                    title='Change Profile Picture' 
                    isOpen={isEditAvatarPopupOpen ? 'popup_open' : ''} 
                    onClose={closeAllPopups} 
                    buttonText="Save" 
                    submitHandler={submitHandlerAvatar}
                >
                    <label className="popup__field">
                        <input 
                            type="url" 
                            className="popup__input popup__input_type_avatar" 
                            id="input-avatar" 
                            name="avatar" 
                            placeholder="Image URL" 
                            required 
                        />
                        <span className="input-avatar-error"></span>
                    </label>
                </PopupWithForm>

                <PopupWithForm 
                    name='delete-card' 
                    title='Are you Sure?' 
                    isOpen={isDeleteCardPopupOpen ? 'popup_open' : ''} 
                    onClose={closeAllPopups} 
                    buttonText="Yes" 
                    submitHandler={submitHandlerDeleteCard} 
                />
            </div>
        </div>
    );
}

export default App;