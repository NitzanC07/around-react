
function Main() {
    return(
        <main className="main-content">
            <section className="profile">
                <div className="profile__avatar">
                    <div className="profile__avatar-picture"></div>
                    <div className="profile__avatar-active"></div>
                </div>
                    <div className="profile__group">
                        <h1 className="profile__name">Cousteau</h1>
                        <button className="profile__edit-button" type="button"></button>
                        <p className="profile__description">Explorer</p>
                    </div>
                <button className="profile__add-button" type="button"></button>
            </section>
            
            <section className="cards">
                <ul className="cards__container">
                    
                </ul>
            </section>
        </main>
    )
}

export default Main;