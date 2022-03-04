import React, { useState } from 'react';
import profilePicture from '../images/imageprofile.png';
import api from '../utils/api.js';
import Card from './Card.js';

function Main(props) {

    // console.log("Main: ", props);

    const [userName, setUserName] = useState();
    const [userDescription, setUserDescription] = useState();
    const [userAvatar, setUserAvatar] = useState();
    const [userId, setUserId] = useState();
    const [cards, setCards] = useState([]);

    React.useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([userData, cardsData]) => {
            setUserId(userData._id)
            setUserAvatar(userData.avatar)
            setUserName(userData.name)
            setUserDescription(userData.about)
            setCards(cardsData)
        })
        .catch(err => {
            console.log(err);
        });
    }, [])

    return(
        <main className="main-content">
            <section className="profile">
                <div className="profile__avatar">
                    <img className="profile__avatar-picture" src={userAvatar} alt="Profile Picture" />
                    <div className="profile__avatar-active" onClick={props.onEditAvatarClick}></div>
                </div>
                    <div className="profile__group">
                        <h1 className="profile__name">{userName}</h1>
                        <button type="button" className="profile__edit-button" onClick={props.onEditProfileClick}></button>
                        <p className="profile__description">{userDescription}</p>
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
                                userId={userId} 
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