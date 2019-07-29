import React from "react";

export default function CardBeer(props) {
  return (
    <article className="beer-card">
      <h2 className="visually-hidden">Карточка товара "пива"</h2>
      <img className="beer-card__image" alt="Бутылка пива" />
      <div className="beer-card__wrapper">
        <p className="beer-card__name">name</p>
        <p className="beer-card__tagline">tagline</p>
        <p className="beer-card__abv">abv</p>
        <p className="beer-card__brewed">first_brewed</p>
      </div>
      <p className="beer-card__description">description</p>
      <input
        className="beer-card__favorite-checkbox"
        type="checkbox"
        title="В избранное"
      />
    </article>
  );
}
