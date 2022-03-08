import React, { useState, useEffect } from 'react';

function PopupWithForm(props) {
    // console.log("Popup with form", props);

    useEffect(() => {
        const closeByEscape = (evt) => {
            if (evt.key === 'Escape') {
                props.onClose();
            }
        }
        document.addEventListener('keyup', closeByEscape)
        return () => document.removeEventListener('keyup', closeByEscape)
    }, [])

    useEffect(() => {
        const closeByOverlay = (evt) => {
            if(evt.target.classList.contains('popup_open')) {
                props.onClose();
            }
        }
        document.addEventListener('mouseup', closeByOverlay)
        return () => document.removeEventListener('mouseup', closeByOverlay)
    }, [])

    return(
        <div className={`popup popup_type_${props.name} ${props.isOpen}`}>
            <div className="popup__container">
                <form 
                    className="popup__form popup__form_profile" 
                    name={props.name}
                    onSubmit={props.submitHandler} 
                    noValidate
                >
                    <button 
                        type="button"
                        className="popup__close-button popup__close-button_profile"
                        onClick={props.onClose}
                    />
                    <h2 
                        className="popup__header">
                        {props.title}
                    </h2>
                    {props.children}
                    <button 
                        className="popup__submit-button popup__submit-button_card" 
                        type="submit">
                        {props.buttonText}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default PopupWithForm;