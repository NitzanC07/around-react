import { logDOM } from '@testing-library/react';
import React, { useState } from 'react';

function Card(props) {

    // console.log("Card props", props);

    const isOwner = props.userId === props.card.owner._id;
    const isLiked = props.card.likes.some(user => props.userId === user._id)
    
    return(
        <li className="cards__card">
            <img 
                className="cards__image" 
                onClick={() => props.onCardClick({name: props.name, link: props.link})}
                src={props.link} 
                alt={props.name} 
            />
            <button 
                className={`cards__delete-button${isOwner ? '' : '_invisible'}`} 
                type="button" onClick={() => { props.deleteCard(props.card) }}
            />
            <div className="cards__group">
                <h2 className="cards__header">{props.name}</h2>
                <div className="cards__likes">
                    <button 
                        className={`cards__like-button ${isLiked ? 'cards__like-button_active' : '' }`} 
                        type="button"
                        onClick={() => {props.likeCard(props.card._id, props.userId, props.card.likes, props)}}
                    />
                    <span className="cards__likes-counter">{props.card.likes.length}</span>
                </div>
            </div>
        </li>
    )
}

export default Card;