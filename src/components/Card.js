import React, { useState } from 'react';

function Card(props) {

    // console.log("Card props", props);
    const isOwner = props.userId === props._id;
    const isLiked = props.card.likes.some(person => person._id === props._userId)

    return(
        <>
            <li className="cards__card" key={props._id}>
                <img className="cards__image" onClick={props.onCardClick} src={props.card.link} alt={props.card.name} />
                <button className={`cards__delete-button${isOwner ? '' : '_invisible'}`} type="button" />
                <div className="cards__group">
                    <h2 className="cards__header">{props.card.name}</h2>
                    <div className="cards__likes">
                        <button className={`cards__like-button${isLiked ? '_active' : '' }`} type="button"></button>
                        <span className="cards__likes-counter">{props.card.likes.length}</span>
                    </div>
                </div>
            </li>
        </>
    )
}

export default Card;