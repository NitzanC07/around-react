import React, { useContext, useEffect, useState } from 'react';
import profilePicture from '../images/imageprofile.png';
import api from '../utils/api.js';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Main(props) {

    // console.log("Main: ", props);
    const currentUser = useContext(CurrentUserContext);
    console.log("currentUser: ", currentUser);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
            // setUserName(userData.name)
            // setUserDescription(userData.about)
            // setUserAvatar(userData.avatar)
            // setUserId(userData._id)
            setCards(cardsData)
        })
        .catch(err => {
            console.log(err);
        });
        // console.log("userData ---1", cards);
    }, []);

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
                                deleteCard={props.deleteCard}
                                likeCard={props.likeCard}
                            />
                        ))
                    }
                </ul>
            </section>
        </main>
    )
}

export default Main;