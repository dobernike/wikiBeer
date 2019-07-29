import React from "react";

export default function NavigationItem() {
  return (
    <>
      <li>
        <a href="#-">left</a>&nbsp;
      </li>
      <li className="active">
        <a href="#1">1</a>
      </li>
      <li>
        <a href="#2">2</a>
      </li>
      <li>
        <a href="#3">3</a>
      </li>
      <li>
        <a href="#4">4</a>
      </li>
      <li>
        <a href="#5">5</a>
      </li>
      <li>
        <a href="#+">right</a>
      </li>
    </>
  );
}
