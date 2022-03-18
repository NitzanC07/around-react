import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWIthForm";

function EditProfilePopup(props) {

    const [name, setName] = useState('');
    const [description , setDescription ] = useState('');

    const currentUser = useContext(CurrentUserContext);
    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser]); 

    function handleChangeNameInput(e) {
        setName(e.target.value)
    }

    function handleChangeAboutInput(e) {
        setDescription(e.target.value)
    }

    function submitHandler(e) {
        e.preventDefault();
        props.onUpdateUser({
            name: name,
            about: description,
          });
        currentUser.name = name;
        currentUser.about = description;
        props.onClose();
    }

    return(
        <PopupWithForm 
            name='edit-profile' 
            title='Edit Profile' 
            isOpen={props.isOpen ? 'popup_open' : ''} 
            onClose={props.onClose} 
            buttonText="Save" 
            onSubmit={submitHandler}
        >
            <label className="popup__field">
                <input 
                    type="text" 
                    className="popup__input popup__input_content_name" 
                    id="input-name" 
                    name="name" 
                    placeholder="What is your name?" 
                    minLength="2" 
                    maxLength="40" 
                    onChange={handleChangeNameInput}
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
                    onChange={handleChangeAboutInput}
                    required 
                />
                <span className="input-about-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditProfilePopup;