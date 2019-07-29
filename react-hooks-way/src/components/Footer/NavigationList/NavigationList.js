import React from "react";
import NavigationItem from "./NavigationItem/NavigationItem";

export default function Navigation() {
  return (
    <nav className="pagination" role="navigation">
      <ul className="pagination__list">
        <NavigationItem />
      </ul>
    </nav>
  );
}
