import React, { useState } from "react";
import "./App.css";
import getBeers from '../../service/getBeers';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Modal from "../Modal/Modal";

const COUNT_CARDS = 6;


export default function App() {
  const [beers, setBeers] = useState([]);

  const updateCards = (currentPage = 1, cardsPerPage = COUNT_CARDS) => {
    getBeers(currentPage, cardsPerPage).then(fetchBeers => setBeers(fetchBeers));
  }

  if (beers.length === 0) updateCards();

  const getMain = () => {
    return beers.length !== 0
      ? <Main beers={beers} />
      : null;
  }

  return (
    <>
      <Header />
      { getMain() }
      <Footer />
      <Modal />
    </>
  );
}

