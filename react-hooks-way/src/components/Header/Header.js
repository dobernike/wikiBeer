import React from "react";
import TopPanel from "./TopPanel/TopPanel";
import SearchSortPanel from "./SearchSortPanel/SearchSortPanel";

export default function Header() {
  return (
    <header className="main-header">
      <TopPanel />
      <SearchSortPanel />
    </header>
  );
}
