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
const _apiBase: string = "https://api.punkapi.com/v2/";

const getBeers = async (page: number) => {
  const url = `beers?page=${page}&per_page=6`;
  const res = await fetch(_apiBase + url);
  if (!res.ok) {
    throw new Error(`Could not fetch ${url}` + `, received ${res.status}`);
  }
  const json = await res.json();
  return json.map(_transformBeers);
};

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
// Rerender DOM
let data = getBeers(1);
data.then(beers => {
  const cards = document.querySelectorAll(".beer-card");
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
  });
});

