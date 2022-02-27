import profilePicture from '../images/imageprofile.png';

function Main(props) {
    return(
        <main className="main-content">
            <section className="profile">
                <div className="profile__avatar">
                    <img className="profile__avatar-picture" src={profilePicture} alt="Profile Picture" />
                    <div className="profile__avatar-active" onClick={props.onEditAvatarClick}></div>
                </div>
                    <div className="profile__group">
                        <h1 className="profile__name">Cousteau</h1>
                        <button type="button" className="profile__edit-button" onClick={props.onEditProfileClick}></button>
                        <p className="profile__description">Explorer</p>
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