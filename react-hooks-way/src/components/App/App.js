import React, { useState } from "react";
import "./App.css";
import getBeers from '../../service/getBeers';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import Modal from "../Modal/Modal";

const COUNT_CARDS = 6;
const DEBOUNCE_INTERVAL = 500;

export default function App() {
  const [modalOpen, setModalOpen] = useState(false);
  const [beers, setBeers] = useState([]);
  const [searchName, setSearchName] = useState('');
  const [reverse, setReverse] = useState(false);
  const [PAGE, setPage] = useState({
    FIRST: 1,
    current: 1,
    LAST: 5
  });

  let lastTimeout = null;

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

  // Pagination
  const handlePagination = (evt) => {
    evt.preventDefault();
    const target = evt.target;

    if (target.tagName !== "A") return;

    if (target.innerText === "left") {
      const havePage = hasPage(target.innerText);
      return havePage ? debounce(changePage, -1) : null;
    } else if (target.innerText === "right") {
      const havePage = hasPage(target.innerText);
      return havePage ? debounce(changePage, +1) : null;
    } else return debounce(setNumberPage, +target.innerText);
  }

  const hasPage = (direction) => {
    switch (direction) {
      case "left":
        return PAGE.current > PAGE.FIRST;
      case "right":
        return PAGE.current < PAGE.LAST;
      default:
        return;
    }
  }

  const changePage = (number) => {
    return (PAGE.current += number);
  }

  const setNumberPage = (number) => {
    return (PAGE.current = number);
  };

  const debounce = (updatePage, target) => {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(() => {
      const currentPage = updatePage(target);

      setPage({ ...PAGE, ...PAGE.current = currentPage });

      updateCards(currentPage);
    }, DEBOUNCE_INTERVAL);
  };

  return (
    <>
      <Header changeModal={changeModal} beers={beers} searchHandler={searchHandler} onSortPanel={onSort} />
      <Main beers={beers} searchName={searchName} />
      <Footer handlePagination={handlePagination} page={PAGE} />
      <Modal isOpen={modalOpen} onClose={changeModal} onSubmit={submitHadle} />
    </>
  );
}

