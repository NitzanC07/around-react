import { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
    // console.log("Edit Avatar Popup", props);

    const [avatar, setAvatar] = useState('');
    const currentUser = useContext(CurrentUserContext);
    useEffect(() => {
        setAvatar(currentUser.avatar);
    }, [currentUser])

    function handleChangeAvatarInput(e) {
        setAvatar(e.target.value)
    }

    function submitHandler(e) {
        e.preventDefault();
        props.onUpdateAvatar({
            avatar: avatar,
        });
        currentUser.avatar = avatar;
        props.onClose();
    }

    return(
        <PopupWithForm 
            name='avatar' 
            title='Change Profile Picture' 
            isOpen={props.isOpen ? 'popup_open' : ''} 
            onClose={props.onClose} 
            buttonText="Save" 
            onSubmit={submitHandler}
        >
            <label className="popup__field">
                <input 
                    type="url" 
                    className="popup__input popup__input_type_avatar" 
                    id="input-avatar" 
                    name="avatar" 
                    placeholder="Input an image URL" 
                    onChange={handleChangeAvatarInput}
                    required 
                />
                <span className="input-avatar-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;