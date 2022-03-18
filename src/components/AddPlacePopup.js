import React, { useState } from "react";
import PopupWithForm from "./PopupWIthForm";

function AddPlacePopup(props) {
    // console.log("Add place popup: ", props);

    const [name, setName] = useState('');
    const [url, setUrl] = useState('');

    function handleChangeNameInput(e) {
        setName(e.target.value);
    }

    function handleChangeUrlInput(e) {
        setUrl(e.target.value);
    }

    function handleAddPlaceSubmit(e) {
        e.preventDefault();
        const data = {
            name: name,
            link: url,
        }
        props.onUpdateAddCard(data)
        props.onClose();
    }

    return(
        <PopupWithForm 
            name='add-card' 
            title='New Place' 
            isOpen={props.isOpen ? 'popup_open' : ''} 
            onClose={props.onClose} 
            buttonText="Save" 
            onSubmit={handleAddPlaceSubmit}
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
                    onChange={handleChangeNameInput}
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
                    onChange={handleChangeUrlInput}
                    required 
                />
                <span className="input-image-error"></span>
            </label>
        </PopupWithForm>
    )
}

export default AddPlacePopup;