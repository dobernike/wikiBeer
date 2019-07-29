import React from "react";

export default function SearchSortPanel(props) {
  return (
    <section className="search-sort container">
      <h1 className="visually-hidden">Поиск и сортировка</h1>
      <form className="search" action="#">
        <input type="search" list="beer" />
        <datalist id="beer">
          <option value="" />
        </datalist>
      </form>
      <div className="sort">
        <button
          className="button button--red button__sort button__sort--name"
          type="button"
        >
          Sort name
        </button>
        <button
          className="button button--red button__sort button__sort--abv"
          type="button"
        >
          Sort abv
        </button>
      </div>
    </section>
  );
}
