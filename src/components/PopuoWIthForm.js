
function PopupWithForm(props) {
    return(
        <>
            <div className={`popup popup_type_${props.name}`}>
                <div className="popup__container">
                    <button className="popup__close-button popup__close-button_profile" type="button"></button>
                    <h2 className="popup__header">{props.title}</h2>
                    {props.children}
                </div>
            </div>
        </>
    )
}

export default PopupWithForm;