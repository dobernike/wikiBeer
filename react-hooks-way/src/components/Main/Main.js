import React from "react";
import CardBeer from "./CardBeer/CardBeer";

export default function Main(props) {
  const cards = []; // props.cards;


  if (localStorage.length > 0) {
    if (localStorage.getItem(`favorite_${props.name}`)) {
      // favorite.checked = true;
    } else {
      // favorite.checked = false;
    }
  }

  props.beers.map((beer, index) => cards.push(<CardBeer key={beer.name + index} image={beer.img}
    name={beer.name} tagline={beer.tagline} abv={beer.abv} brewed={beer.brewed}
    description={beer.description} favorite={true} />));

  return <main className="main container">{cards}</main>;
}
