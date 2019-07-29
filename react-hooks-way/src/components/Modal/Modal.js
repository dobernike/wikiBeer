import React from "react";
import LoginPopup from "./LoginPopup/LoginPopup";
import Overlay from "./Overlay/Overlay";

export default function Modal() {
  return (
    <>
      <LoginPopup />
      <Overlay />
    </>
  );
}
