import Card from './Card.js';

function PopupWithImage(props) {
    // console.log("PopupWithImage", props)
    return(
        <>
            <div className={`popup popup_type_image ${props.isOpen}`}>
                <div className="popup__container-image">
                    <button 
                        className="popup__close-button popup__close-button_image" 
                        type="button" 
                        onClick={props.onClose} 
                    />
                    <img 
                        className="popup__image" 
                        src={props.cardData.link}
                        alt={props.cardData.name}
                    />
                    <div className="popup__image-description">{props.cardData.name}</div>
                </div>
            </div>
        </>
    )
}

export default PopupWithImage;