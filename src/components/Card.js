import React, { useState } from 'react';

function Card(props) {

    // console.log("Card props", props);
    const isOwner = props.userId === props._id;
    const isLiked = props.card.likes.some(person => person._id === props._userId)
    const imageName = props.name;
    const imageSrc = props.link;

    return(
        <>
            <li className="cards__card" key={props._id}>
                <img 
                    className="cards__image" 
                    onClick={props.onCardClick} 
                    src={imageSrc} 
                    alt={imageName} 
                />
                <button 
                    className={`cards__delete-button${isOwner ? '' : '_invisible'}`} 
                    type="button" 
                />
                <div className="cards__group">
                    <h2 className="cards__header">{imageName}</h2>
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