function PopupWithForm(props) {
    // console.log("Popup with form", props);

    return(
        <div className={`popup popup_type_${props.name} ${props.isOpen}`}>
            <div className="popup__container">
                <form 
                    className="popup__form popup__form_profile" 
                    name={props.name}
                    onSubmit={props.onSubmit} 
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
