import React from "react";
import CardBeer from "./CardBeer/CardBeer";

export default function Main({ beers, searchName } = {}) {
  const cards = [];


  beers.map((beer, index) => {
    let cardStyle = searchName === beer.name ? { borderColor: `red`, order: -1 } : {};

    console.log(cardStyle);

    return cards.push(<CardBeer key={beer.name + index} image={beer.img}
      name={beer.name} tagline={beer.tagline} abv={beer.abv} brewed={beer.brewed}
      description={beer.description} cardStyle={cardStyle} />)
  });

  return <main className="main container">{cards}</main>;
}
