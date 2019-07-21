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
  cards.forEach((card, index) => {
    const beer = beers[index];
    const img = card.querySelector(".beer-card__image");
    img.src = beer.img;
    const name = card.querySelector(".beer-card__name");
    name.innerText = "name: " + beer.name;
    const tagline = card.querySelector(".beer-card__tagline");
    tagline.innerText = "tagline: " + beer.tagline;
    const abv = card.querySelector(".beer-card__abv");
    abv.innerText = "abv: " + beer.abv;
    const brewed = card.querySelector(".beer-card__brewed");
    brewed.innerText = "brewed: " + beer.brewed;
    const description = card.querySelector(".beer-card__description");
    description.innerText = "description: " + beer.description;
    const favorite = card.querySelector(".beer-card__favorite-checkbox");
    if (localStorage.length > 0) {
      favorite.checked = localStorage.getItem(`favorite_${name.innerText}`);
    }
  });
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

// Favorites
const main = document.querySelector(".main");
main.addEventListener("click", function favoriteHandler(evt) {
  const favorite = evt.target as HTMLElement;
  if (favorite.tagName !== "INPUT") {
    return;
  }

  const beerName = favorite.parentElement.querySelector(".beer-card__name")
    .innerText;

  if (!favorite.checked) {
    localStorage.removeItem(`favorite_${beerName}`);
  } else {
    localStorage.setItem(`favorite_${beerName}`, "true");
  }
});
