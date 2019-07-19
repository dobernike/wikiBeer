// modal sing-in
const singIn = document.querySelector(".main-header__sing-in");
const successPopup = document.querySelector(".modal-success");
const popup = document.querySelector(".modal-login");
const close = popup.querySelector(".modal-login__button--close");
const overlay = document.querySelector(".modal-overlay");

const form = popup.querySelector(".modal-login__form");
const login = popup.querySelector("[name=login]");
const email = popup.querySelector("[name=email]");
const password = popup.querySelector("[name=password]");

let isStorageSupport = true;
let storage = "";

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

overlay.addEventListener("click", function(evt) {
  evt.preventDefault();
  popup.classList.remove("modal-show");
  overlay.classList.remove("modal-show");
});

window.addEventListener("keydown", function(evt) {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    popup.classList.remove("modal-show");
    overlay.classList.remove("modal-show");
  }
});

form.addEventListener("submit", function(evt) {
  evt.preventDefault();
  popup.classList.remove("modal-show");
  overlay.classList.remove("modal-show");
  console.warn("Вы вошли!");
});

// const API = "https://api.punkapi.com/v2/";
