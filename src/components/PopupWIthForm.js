
function PopupWithForm(props) {
    // console.log("Popup with form", props);
    return(
        <>
            <div className={`popup popup_type_${props.name} ${props.isOpen}`}>
                <div className="popup__container">
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
                </div>
            </div>
        </>
    )
}

export default PopupWithForm;