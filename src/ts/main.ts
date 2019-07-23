// modal sing-in
const singIn = document.querySelector(".main-header__sing-in");
const popup = document.querySelector(".modal-login");
const close = popup.querySelector(".modal-login__button--close");
const form = popup.querySelector(".modal-login__form");
const login = popup.querySelector("[name=login]");
const email = popup.querySelector("[name=email]");
const password = popup.querySelector("[name=password]");
const overlay = document.querySelector(".modal-overlay");

singIn.addEventListener("click", evt => {
  evt.preventDefault();
  popup.classList.add("modal-show");
  overlay.classList.add("modal-show");
});

close.addEventListener("click", evt => {
  evt.preventDefault();
  popup.classList.remove("modal-show");
  overlay.classList.remove("modal-show");
});

overlay.addEventListener("click", evt => {
  evt.preventDefault();
  popup.classList.remove("modal-show");
  overlay.classList.remove("modal-show");
});

window.addEventListener("keydown", evt => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    popup.classList.remove("modal-show");
    overlay.classList.remove("modal-show");
  }
});

form.addEventListener("submit", evt => {
  evt.preventDefault();
  popup.classList.remove("modal-show");
  overlay.classList.remove("modal-show");
  console.warn("Вы вошли!");
});

// Loading data from API
const _apiBase = "https://api.punkapi.com/v2/";

const PAGE = {
  FIRST: 1,
  current: 1,
  LAST: 5
};

const cards = document.querySelectorAll(".beer-card");
const pagination = document.querySelector(".pagination__list");
const paginationItems = pagination.children;

const getBeers = async (currentPage: number) => {
  const paginationItem = pagination.querySelector(".active");
  paginationItem.classList.remove("active");

  paginationItems[currentPage].classList.add("active");

  const url = `/beers?page=${currentPage}&per_page=6`;
  const res = await fetch(_apiBase + url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
  }

  const json = await res.json();
  const beers = json.map(_transformBeers);
  // Rerender DOM
  main.innerHTML = "";
  const beersNames = [];
  beers.forEach(beer => {
    beersNames.push(beer.name);
    createCard(beer);
  });
  createSearch(beersNames);
};

getBeers(PAGE.current);

const _transformBeers = (beer: any) => {
  return {
    img: beer.image_url,
    name: beer.name,
    tagline: beer.tagline,
    abv: beer.abv,
    brewed: beer.first_brewed,
    description: beer.description
  };
};

// Pagination
pagination.addEventListener("click", (evt: MouseEvent) => {
  evt.preventDefault();
  const target = evt.target as HTMLElement;
  if (target.tagName !== "A") {
    return;
  }
  if (target.innerText === "left") {
    if (PAGE.current > PAGE.FIRST) {
      debounce(getPrevPage, target);
    }
  } else if (target.innerText === "right") {
    if (PAGE.current < PAGE.LAST) {
      debounce(getNextPage, target);
    }
  } else {
    debounce(getPage, target);
  }
  return;
});

const DEBOUNCE_INTERVAL = 500;
let lastTimeout: number;

const debounce = (updatePage: Function, target: HTMLElement = null) => {
  if (lastTimeout) {
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(function() {
    updatePage(target);
  }, DEBOUNCE_INTERVAL);
};

const getPrevPage = () => {
  PAGE.current -= 1;
  getBeers(PAGE.current);
};

const getNextPage = () => {
  PAGE.current += 1;
  getBeers(PAGE.current);
};

const getPage = (target: HTMLElement) => {
  PAGE.current = +target.innerText;
  getBeers(PAGE.current);
};

const cache = [];

// Favorites
const main = document.querySelector(".main");
main.addEventListener("click", function favoriteHandler(evt) {
  const favorite = evt.target as HTMLElement;
  if (favorite.tagName !== "INPUT") {
    return;
  }

  const beerName = favorite.parentElement.querySelector(".beer-card__beer-name")
    .innerText;

  if (!favorite.checked) {
    localStorage.removeItem(`favorite_${beerName}`);
  } else {
    localStorage.setItem(`favorite_${beerName}`, "true");
  }
});

let clicked = false;
const favoriteBtn = document.querySelector(".main-header__favorite");
favoriteBtn.addEventListener("click", (evt: MouseEvent) => {
  evt.preventDefault();

  if (!clicked) {
    clicked = true;
    pagination.setAttribute("style", "visibility: hidden");
    favoriteBtn.innerText = `back`;
    favoriteBtn.setAttribute("style", "background-color: green");

    const newMain = new DocumentFragment();

    console.log(cache);

    for (const item of cache) {
      const cacheItemName = item.querySelector(".beer-card__beer-name")
        .textContent;

      if (localStorage.getItem(`favorite_${cacheItemName}`)) {
        newMain.appendChild(item);
      }
    }

    main.innerHTML = "";
    main.appendChild(newMain);
  } else {
    clicked = false;
    pagination.removeAttribute("style");
    favoriteBtn.innerText = `favorite`;
    favoriteBtn.removeAttribute("style");
    getBeers(PAGE.current);
  }
});

// CreateBeerCard
const createCard = beer => {
  const card = document.createElement("article");
  card.className = "beer-card";

  const img = document.createElement("img");
  img.className = "beer-card__image";
  img.src = beer.img;
  card.appendChild(img);
  const wrapper = document.createElement("div");
  wrapper.className = "beer-card__wrapper";

  const name = document.createElement("p");
  name.className = "beer-card__name";
  name.innerText = "name: ";

  const beerName = document.createElement("span");
  beerName.className = "beer-card__beer-name";
  beerName.innerText = beer.name;

  name.appendChild(beerName);
  wrapper.appendChild(name);

  const tagline = document.createElement("p");
  tagline.className = "beer-card__tagline";
  tagline.innerText = "tagline: " + beer.tagline;
  wrapper.appendChild(tagline);

  const abv = document.createElement("p");
  abv.className = "beer-card__abv";
  abv.innerText = "abv: ";

  const beerAbv = document.createElement("span");
  beerAbv.className = "beer-card__beer-abv";
  beerAbv.innerText = beer.abv;

  abv.appendChild(beerAbv);
  wrapper.appendChild(abv);

  const brewed = document.createElement("p");
  brewed.className = "beer-card__brewed";
  brewed.innerText = "brewed: " + beer.brewed;
  wrapper.appendChild(brewed);
  card.appendChild(wrapper);

  const description = document.createElement("p");
  description.className = "beer-card__description";
  card.appendChild(description);
  description.innerText = "description: " + beer.description;

  const favorite = document.createElement("input");
  favorite.className = "beer-card__favorite-checkbox";
  favorite.type = "checkbox";
  favorite.title = "В избранное";
  if (localStorage.length > 0) {
    if (localStorage.getItem(`favorite_${beer.name}`)) {
      favorite.checked = true;
    } else {
      favorite.checked = false;
    }
  }
  card.appendChild(favorite);

  main.appendChild(card);

  if (cache.length !== 0) {
    for (const item of cache) {
      const cacheItemName = item.querySelector(".beer-card__beer-name")
        .textContent;

      if (cacheItemName === beer.name) {
        return;
      }
    }
  }
  cache.push(card);
};

// Search
const searchFlex = document.querySelector(".search-sort");

const createSearch = (beersNames: string[]) => {
  const mockSearch = searchFlex.querySelector(".search");
  mockSearch.removeEventListener("submit", searchHandler);

  const search = document.createElement("form");
  search.className = "search";

  const input = document.createElement("input");
  input.type = "search";
  input.name = "search-input";
  input.setAttribute("list", "beer");
  input.required = true;

  const datalist = document.createElement("datalist");
  datalist.id = "beer";

  beersNames.forEach(name => {
    const option = document.createElement("option");
    option.value = name;
    datalist.appendChild(option);
  });

  const submit = document.createElement("button");
  submit.className = "button button--red";
  submit.innerText = "Search";
  submit.type = "submit";
  submit.setAttribute("style", "margin-left: 10px");

  search.appendChild(input);
  search.appendChild(datalist);
  search.appendChild(submit);

  main.appendChild(search);

  search.addEventListener("submit", searchHandler);
  function searchHandler(evt: MouseEvent) {
    evt.preventDefault();

    const search = evt.target[0] as HTMLElement;

    if (beersNames.includes(search.value)) {
      const beerCards = main.children;

      for (const beerCard of beerCards) {
        beerCard.setAttribute("style", "");
        const cardName = beerCard.querySelector(`.beer-card__name`);

        if (cardName.textContent === `name: ${search.value}`) {
          beerCard.setAttribute("style", "border-color: red; order: -1;");
        }
      }
    }
  }

  searchFlex.replaceChild(search, mockSearch);
};

// Sorting
const sortPanel = document.querySelector(".search-sort");
sortPanel.addEventListener("click", function onSortPanel(evt) {
  const target = evt.target as HTMLElement;

  if (!target.classList.contains("button__sort")) {
    return;
  }
  evt.preventDefault();
  if (target.classList.contains("button__sort")) {
    const classes = target.className;

    const regexp = /sort--(.*)/;
    const element = classes.match(regexp)[1];

    onSort(element);
  }
});

let reverse = false;
const onSort = (element: string) => {
  const beforeSorting = [];
  let afterSorting = [];

  const beerCards = document.querySelectorAll(".beer-card");
  beerCards.forEach(card => {
    const beerName = card.querySelector(`.beer-card__beer-${element}`)
      .textContent;
    beforeSorting.push(beerName);
  });
  if (isNaN(beforeSorting[0])) {
    // @ts-ignore
    afterSorting = beforeSorting.sort((a, b) => (reverse ? a < b : b < a));
  } else {
    afterSorting = beforeSorting.sort((a, b) => (reverse ? a - b : b - a));
  }
  reverse = !reverse;
  beerCards.forEach(card => {
    const name: any = card.querySelector(`.beer-card__beer-${element}`);
    for (const index in afterSorting) {
      const sortName = afterSorting[index];
      if (name.textContent === sortName) {
        card.setAttribute("style", `order: ${index}`);
        break;
      }
    }
  });
};

const removeChildren = (elem: any) => {
  elem.innerHTML = "";
};
