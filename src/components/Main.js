import { useState } from 'react';
import profilePicture from '../images/imageprofile.png';
import api from '../utils/api.js';

function Main(props) {

    const [userName, setUserName] = useState();
    const [userDescription, setUserDescription] = useState();
    const [userAvatar, setUserAvatar] = useState();
    const [cards, setCards] = useState([]);

    Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, cardsData]) => {
        console.log(userData);
        setUserName(userData.name)
        setUserDescription(userData.about)
        setUserAvatar(userData.avatar)
        // setCards(cardsData)
    })
    .catch(err => {
        console.log(err);
    });

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
                    
                </ul>
            </section>
        </main>
    )
}

export default Main;

{/* <template id="card-template">
    <li class="cards__card">
        <img class="cards__image" src=" " alt=" ">
        <button class="cards__delete-button" type="button"></button>
        <div class="cards__group">
            <h2 class="cards__header"></h2>
            <div class="cards__likes">
                <button class="cards__like-button" type="button"></button>
                <span class="cards__likes-counter"></span>
            </div>
        </div>
    </li>
</template> */}