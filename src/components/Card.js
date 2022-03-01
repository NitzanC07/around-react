import React, {Component, useState} from 'react';

function Card(props) {

    console.log("card Component", props);

    return(
        <>
            <li className="cards__card" key={props._id}>
                <img className="cards__image" src={props.link} alt={props.name} />
                <button className="cards__delete-button" type="button"></button>
                <div className="cards__group">
                    <h2 className="cards__header">{props.name}</h2>
                    <div className="cards__likes">
                        <button className="cards__like-button" type="button"></button>
                        <span className="cards__likes-counter">{props.card.likes.length}</span>
                    </div>
                </div>
            </li>
        </>
    )
}

export default Card;