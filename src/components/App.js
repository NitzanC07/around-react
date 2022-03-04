import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import Card from './Card.js';
import PopupWithForm from './PopupWIthForm.js';
import PopupWithImage from './PopupWithImage.js';
import api from '../utils/api.js';
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

    function getInputsValues(specificForm) {
        const inputsValues = {};
        const inputs = Array.from(specificForm.querySelectorAll(".popup__input"))
        inputs.forEach(input => {
            inputsValues[input.name] = input.value;
        })
        return inputsValues
    }
    
    const [selectedCard, setSelectedCard] = useState({})

    function handleImageClick(card) {
        // console.log("Card was clicked!", card.target);
        setSelectedCard({name: card.target.alt, link: card.target.src})
        setStateImagePopupOpen(true);
        document.addEventListener("keyup", handleEscClose);
        document.addEventListener("mouseup", handleClosePopupwWithOverlay);
    }

    /** Methods for user details. */
    function handleEditProfileClick() {
        setStateEditProfilePopupOpen(true);
        document.addEventListener("keyup", handleEscClose);
        document.addEventListener("mouseup", handleClosePopupwWithOverlay);
    }

    const submitHandlerEditProfile = (e) => {
        e.preventDefault();
        const profileData = getInputsValues(e.target);
        api.setUserInfo(profileData)
            .then((res) => {
                console.log("Response", res);
                document.querySelector(".profile__name").textContent = res.name;
                document.querySelector(".profile__description").textContent = res.about;
            })
            .catch(err => 
                console.log("Error:", err)
            );
        closeAllPopups();
    }

    /** Methods for cahnging avatar (profile picture) */
    function handleEditAvatarClick() {
        setStateEditAvatarPopupOpen(true);
        document.addEventListener("keyup", handleEscClose);
        document.addEventListener("mouseup", handleClosePopupwWithOverlay);
    }

    const submitHandlerAvatar = (e) => {
        e.preventDefault();
        console.log("Submitted!!!", e.target);
        const newAvatar = getInputsValues(e.target);
        console.log(newAvatar);
        api.changeAvatar(newAvatar)
            .then((res) => {
                console.log("Response:", res);
                document.querySelector(".profile__avatar-picture").src = res.avatar;
            })
            .catch(err => 
                console.log("Error:", err)
            );
        closeAllPopups()
    }

    /** Methods for adding new card. */

    function handleAddPlaceClick() {
        console.log("Open popup for add card.");
        setStateAddPlacePopupOpen(true);
        document.addEventListener("keyup", handleEscClose);
        document.addEventListener("mouseup", handleClosePopupwWithOverlay);
    }

    function handleDeleteCard(card) {
        console.log("Card deleted!!!", card)
        

    }

    function handleLikeCard(Card) {
        console.log("Card liked!!!", Card.props)
        
    }

    const submitHandlerAddCard = (e) => {
        e.preventDefault();
        console.log("Submitted!!!", e.target);
        const newCard = getInputsValues(e.target);
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
                />
                console.log("Card", Card);
                document.querySelector(".cards__container").prepend(newCard);
            })
            .catch(err => 
                console.log("Error:", err)
            );
        closeAllPopups()
    }

    const submitHandler = (e) => {
        e.preventDefault();
        console.log("Submitted!!!", e.target);

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
                    likeCard={handleLikeCard}
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
                            <input type="text" className="popup__input popup__input_content_description" id="inputAbout" name="about" placeholder="Describe your role" minLength="2" maxLength="200" required />
                            <span className="input-about-error"></span>
                        </label>
                        <button className="popup__submit-button popup__submit-button_profile" type="submit">Save</button>
                    </form>
                </PopupWithForm>

                <PopupWithForm name='add-card' title='New Place' isOpen={isAddPlacePopupOpen ? 'popup_open' : ''} onClose={closeAllPopups}>
                    <form className="popup__form popup__form_addCard" name="add-place" onSubmit={submitHandlerAddCard} noValidate>
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