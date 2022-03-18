import React from "react";
import PopupWithForm from "./PopupWIthForm";

function DeleteCardPopup(props) {
    console.log("Delete Card Popup: ", props);    

    function submitHandler(e) {
        e.preventDefault();
        console.log("Cards was deleted.", e.target);
        // props.onSubmitClick(card)
        props.onClose();
    }
    return(
        <PopupWithForm 
            name='delete-card' 
            title='Are you Sure?' 
            isOpen={props.isOpen ? 'popup_open' : ''} 
            onClose={props.onClose} 
            buttonText="Yes" 
            onSubmit={submitHandler}
        />
    )
}

export default DeleteCardPopup;