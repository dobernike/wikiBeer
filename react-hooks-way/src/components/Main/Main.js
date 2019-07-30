import React from "react";
import CardBeer from "./CardBeer/CardBeer";

export default function Main(props) {
  const cards = [];

  props.beers.map((beer, index) => {
    return cards.push(<CardBeer key={beer.name + index} image={beer.img}
      name={beer.name} tagline={beer.tagline} abv={beer.abv} brewed={beer.brewed}
      description={beer.description} />)
  });

  return <main className="main container">{cards}</main>;
}
