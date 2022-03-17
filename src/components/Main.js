import React, { useContext, useEffect, useState } from 'react';
import profilePicture from '../images/imageprofile.png';
import api from '../utils/api.js';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {

    // console.log("Main: ", props);
    const currentUser = useContext(CurrentUserContext);
    // console.log("currentUser: ", currentUser);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([api.getInitialCards()])
        .then(([cardsData]) => {
            setCards(cardsData)
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    function handleCardLike(card) {
        // Check one more time if this card was already liked
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        // Send a request to the API and getting the updated card data
        api.changeLikeCardStatus(card._id, !isLiked)
        .then((newCard) => {
            setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        });
    }

    function handleCardDelete(card) {
        props.onDeleteCardClick(card)
    }

    return(
        <main className="main-content">
            <section className="profile">
                <div className="profile__avatar">
                    <img className="profile__avatar-picture" src={currentUser.avatar} alt="Profile Picture" />
                    <div className="profile__avatar-active" onClick={props.onEditAvatarClick}></div>
                </div>
                    <div className="profile__group">
                        <h1 className="profile__name">{currentUser.name}</h1>
                        <button type="button" className="profile__edit-button" onClick={props.onEditProfileClick}></button>
                        <p className="profile__description">{currentUser.about}</p>
                    </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlaceClick}></button>
            </section>
            
            <section className="cards">
                <ul className="cards__container">
                    {
                        cards.map((item) => (
                            <Card 
                                card={item} 
                                key={item._id} 
                                id={item._id} 
                                userId={currentUser._id} 
                                name={item.name}
                                link={item.link}
                                onCardClick={props.onCardClick}
                                onCardDelete={() => handleCardDelete(item)}
                                onCardLike={() => handleCardLike(item)}
                            />
                        ))
                    }
                </ul>
            </section>
        </main>
    )
}

export default Main;