
function handleEditProfileClick() {
    document.querySelector('.popup_type_edit-profile').classList.add('popup_open')
    
}

function handleEditAvatarClick() {
    document.querySelector('.popup_type_avatar').classList.add('popup_open')
}

function handleAddPlaceClick() {
    document.querySelector('.popup_type_add-card').classList.add('popup_open')
}

function Main() {
    return(
        <main className="main-content">
            <section className="profile">
                <div className="profile__avatar">
                    <div className="profile__avatar-picture"></div>
                    <div className="profile__avatar-active" onClick={handleEditAvatarClick}></div>
                </div>
                    <div className="profile__group">
                        <h1 className="profile__name">Cousteau</h1>
                        <button type="button" className="profile__edit-button" onClick={handleEditProfileClick}></button>
                        <p className="profile__description">Explorer</p>
                    </div>
                <button className="profile__add-button" type="button" onClick={handleAddPlaceClick}></button>
            </section>
            
            <section className="cards">
                <ul className="cards__container">
                    
                </ul>
            </section>
        </main>
    )
}

export default Main;