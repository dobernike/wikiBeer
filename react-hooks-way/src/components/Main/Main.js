import React, { useState } from "react";
import CardBeer from "./CardBeer/CardBeer";

export default function Main() {
  const [countCards, setCountCards] = useState(6);

  const cards = [];

  for (let i = 0; i < countCards; i++) {
    cards.push(<CardBeer />);
  }

  return <main className="main container">{cards}</main>;
}
