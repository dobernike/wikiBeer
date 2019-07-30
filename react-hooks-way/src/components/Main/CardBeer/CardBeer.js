import React from "react";

export default function CardBeer(props) {
  return (
    <article className="beer-card">
      <h2 className="visually-hidden">Карточка товара "пива"</h2>
      <img className="beer-card__image" src={props.image} alt="Бутылка пива" />
      <div className="beer-card__wrapper">
        <p className="beer-card__name">{props.name}</p>
        <p className="beer-card__tagline">{props.tagline}</p>
        <p className="beer-card__abv">{props.abv}</p>
        <p className="beer-card__brewed">{props.first_brewed}</p>
      </div>
      <p className="beer-card__description">{props.description}</p>
      <input
        className="beer-card__favorite-checkbox"
        type="checkbox"
        checked={props.favorite}
        title="В избранное"
      />
    </article>
  );
}
