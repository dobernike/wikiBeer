import React, { useState } from "react";
import "./App.css";
import getBeers from '../../service/getBeers';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Modal from "../Modal/Modal";

const COUNT_CARDS = 6;


export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [beers, setBeers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [sortName, setSortName] = useState(null);
  const [reverse, setReverse] = useState(false);
  // Modal
  const changeModal = evt => {
    evt.preventDefault();
    setModalOpen(prevModalOpen => !prevModalOpen);
  };

  const submitHadle = evt => {
    changeModal(evt);
    console.warn("Вы вошли!");
  }
  // Cards
  const updateCards = (currentPage = 1, cardsPerPage = COUNT_CARDS) => {
    getBeers(currentPage, cardsPerPage).then(fetchBeers => setBeers(fetchBeers));
  }

  if (beers.length === 0) updateCards();
  // Search
  const searchHandler = evt => {
    evt.preventDefault();
    const search = evt.target[0];

    setSearchName(search.value);
  }
  // Sort
  const onSort = (element) => {
    const beforeSorting = [];
    let afterSorting = [];

    beers.forEach(card => {
      const beerName = card[element]
      beforeSorting.push(beerName);
    });

    if (isNaN(beforeSorting[0])) {
      afterSorting = beforeSorting.sort((a, b) =>
        reverse ? a < b : b < a
      );
    } else {
      afterSorting = beforeSorting.sort((a, b) =>
        reverse ? a - b : b - a
      );
    }

    setReverse(prevReverse => !prevReverse);

    const cards = new Array(beers.length);

    beers.forEach(card => {
      const name = card[element]
      for (const index in afterSorting) {
        const sortName = afterSorting[index];
        if (name === sortName) {
          cards[index] = card;
          break;
        }
      }
    });

    setBeers(cards);
  }

  return (
    <>
      <Header changeModal={changeModal} beers={beers} searchHandler={searchHandler} onSortPanel={onSort} />
      <Main beers={beers} searchName={searchName} sortName={sortName} />
      <Footer />
      <Modal isOpen={modalOpen} onClose={changeModal} onSubmit={submitHadle} />
    </>
  );
}

