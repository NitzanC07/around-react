import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopuoWIthForm.js';

function App() {
  return (
    <div className="page">
      
        <div className="page__container">
            <Header />
            <Main />
            <Footer />

            <PopupWithForm name='edit-profile' title='Edit Profile'>
                <form className="popup__form popup__form_profile" name="edit-profile" noValidate>
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

            <PopupWithForm name='add-card' title='New Place'>
                <form className="popup__form popup__form_addCard" name="add-place" noValidate>
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

            <PopupWithForm name='avatar' title='Change Profile Picture'>
                <form className="popup__form popup__form_avatar" name="avatar" noValidate>
                    <label className="popup__field">
                        <input type="url" className="popup__input popup__input_type_avatar" id="inputAvatar" name="avatar" placeholder="Image URL" required />
                        <span className="input-avatar-error"></span>
                    </label>
                    <button className="popup__submit-button popup__submit-button_avatar" type="submit">Save</button>
                </form>
            </PopupWithForm>

            <PopupWithForm name='delete-card' title='Are you Sure?'>
                <div className="popup__container">
                    <button className="popup__close-button popup__close-button_card" type="button"></button>
                    <form className="popup__form popup__form_add-card" name="delete-card" noValidate>
                        <button className="popup__submit-button popup__submit-button_card" type="submit">Yes</button>
                    </form>
                </div>
            </PopupWithForm>

            <div className="popup popup_type_image">
                <div className="popup__container-image">
                    <button className="popup__close-button popup__close-button_image" type="button"></button>
                    <img className="popup__image" src=" " alt=" " />
                    <div className="popup__image-description">Image</div>
                </div>
            </div>

        {/* <div className="popup popup_type_edit-profile">
            <div className="popup__container">
                <button className="popup__close-button popup__close-button_profile" type="button"></button>
                <h2 className="popup__header">Edit profile</h2>
                <form className="popup__form popup__form_profile" name="edit-profile" novalidate>
                    <label className="popup__field">
                        <input type="text" className="popup__input popup__input_content_name" id="input-name" name="name" placeholder="What is your name" minlength="2" maxlength="40" required />
                        <span className="input-name-error"></span>
                    </label>
                    <label className="popup__field">
                        <input type="text" className="popup__input popup__input_content_description" id="inputAbout" name="about" placeholder="Describe your role" minlength="2" maxlength="200" required />
                        <span className="input-about-error"></span>
                    </label>
                    <button className="popup__submit-button popup__submit-button_profile" type="submit">Save</button>
                </form>
            </div>
        </div> */}

        {/* <div className="popup popup_type_add-card">
            <div className="popup__container">
                <button className="popup__close-button popup__close-button_card" type="button"></button>
                <h2 className="popup__header">New place</h2>
                <form className="popup__form popup__form_addCard" name="add-place" novalidate>
                    <label className="popup__field">
                        <input type="text" className="popup__input popup__input_type_title" id="input-title" name="name" placeholder="Title" minlength="1" maxlength="30" required />
                        <span className="input-title-error"></span>
                    </label>
                    <label className="popup__field">
                        <input type="url" className="popup__input popup__input_type_image" id="input-image" name="link" placeholder="Image URL" required />
                        <span className="input-image-error"></span>
                    </label>
                    <button className="popup__submit-button popup__submit-button_card" type="submit">Save</button>
                </form>
            </div>
        </div> */}

        {/* <div className="popup popup_type_deleteCard">
            <div className="popup__container">
                <button className="popup__close-button popup__close-button_card" type="button"></button>
                <h2 className="popup__header">Are you sure?</h2>
                <form className="popup__form popup__form_add-card" name="delete-card" novalidate>
                    <button className="popup__submit-button popup__submit-button_card" type="submit">Yes</button>
                </form>
            </div>
        </div> */}

        {/* <div className="popup popup_type_avatar">
            <div className="popup__container">
                <button className="popup__close-button popup__close-button_avatar" type="button"></button>
                <h2 className="popup__header">Change profile picture</h2>
                <form className="popup__form popup__form_avatar" name="avatar" novalidate>
                    <label className="popup__field">
                        <input type="url" className="popup__input popup__input_type_avatar" id="inputAvatar" name="avatar" placeholder="Image URL" required />
                        <span className="input-avatar-error"></span>
                    </label>
                    <button className="popup__submit-button popup__submit-button_avatar" type="submit">Save</button>
                </form>
            </div>
        </div> */}

        </div>

        <template id="card-template">
            <li className="cards__card">
                <img className="cards__image" src=" " alt=" " />
                <button className="cards__delete-button" type="button"></button>
                <div className="cards__group">
                    <h2 className="cards__header"></h2>
                    <div className="cards__likes">
                        <button className="cards__like-button" type="button"></button>
                        <span className="cards__likes-counter"></span>
                    </div>
                </div>
            </li>
        </template>

    </div>
  );
}

export default App;
