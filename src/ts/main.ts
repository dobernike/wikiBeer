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
