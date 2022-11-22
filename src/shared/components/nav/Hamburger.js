import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import MobileModal from "../../../trivia/utils/MobileModal";
import menuIcon from "../../../img/menu.png";
import "./Hamburger.css";

export const Hamburger = ({ menu }) => {
  const [showMobile, setShowMobile] = useState(false);

  return (
    <>
      <MobileModal
        setShowMobile={setShowMobile}
        showMobile={showMobile}
        nav={menu}
      />
      <img
        src={menuIcon}
        className="menu-icon"
        onClick={() => {
          setShowMobile(true);
        }}
        alt="hamburger"
      />
    </>
  );
};

export default Hamburger;
