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
    
    function handleEditAvatarClick() {
        setStateEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setStateEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setStateAddPlacePopupOpen(true);
    }

    function handleImageClick(card) {
        setSelectedCard(card)
        setStateImagePopupOpen(true);
    }

    function handleDeleteCard(card) {
        setStateDeleteCardPopupOpen(true);
        setSelectedCard(card)
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

    useEffect(() => {
        const closeByEscape = (evt) => {
            if (evt.key === 'Escape') {
                // props.onclose();
                closeAllPopups();
            }
        }
        document.addEventListener('keyup', closeByEscape)
        return () => document.removeEventListener('keyup', closeByEscape)
    }, [])

    useEffect(() => {
        const closeByOverlay = (evt) => {
            if(evt.target.classList.contains('popup_open')) {
                // props.onClose();
                closeAllPopups();
            }
        }
        document.addEventListener('mouseup', closeByOverlay)
        return () => document.removeEventListener('mouseup', closeByOverlay)
    }, [])

    function submitHandler(e) {
        e.preventDefault();
        console.log("Submited.");
        closeAllPopups();
    }

    return (
        <div className="page">
        
            <div className="page__container">
                <Header />
                <Main 
                    onEditProfileClick={handleEditProfileClick}
                    onAddPlaceClick={handleAddPlaceClick}
                    onEditAvatarClick={handleEditAvatarClick}
                    onCardClick={handleImageClick}
                    isEditProfilePopupOpen={isEditProfilePopupOpen}
                    isAddPlacePopupOpen={isAddPlacePopupOpen}
                    isEditAvatarPopupOpen={isEditAvatarPopupOpen}
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
                    onSubmit={submitHandler}
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
                    onSubmit={submitHandler}
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
                    onSubmit={submitHandler}
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
                    onSubmit={submitHandler}
                />
            </div>
        </div>
    );
}

export default App;