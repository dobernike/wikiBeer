import React from "react";

export default function TopPanel(props) {
  return (
    <div className="main-header__wrapper">
      <div className="container">
        <button
          className="main-header__favorite button button--red "
          type="button"
        >
          favorite
        </button>
        <a
          href="/login"
          className="main-header__sing-in button button--red "
          type="button"
        >
          sing in
        </a>
      </div>
    </div>
  );
}
