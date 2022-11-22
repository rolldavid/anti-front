import { NavLink, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { connect } from "react-redux";

import Hamburger from "./Hamburger";
import "./NavItems.css";

const NavItems = ({ userStatus, userType, logout }) => {
  const [mobileMenu, setMobileMenu] = useState();
  const [uid, setUid] = useState("");

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (storedData) {
      setUid(storedData.userId);
    } else {
      setUid("login");
    }
  }, [userStatus]);

  let nav;

  if (userStatus && userType === "User") {
    nav = (
      <>
        <NavLink to="/daily" className="navlink-item">
          Daily Game
        </NavLink>
        <NavLink to="/practice" className="navlink-item">
          Practice
        </NavLink>
        <NavLink to={`/bookmarks/${uid}`} className="navlink-item">
          Bookmarks
        </NavLink>
        <NavLink to={`/profile/${uid}`} className="navlink-item">
          Account
        </NavLink>
      </>
    );
  } else if (userStatus && userType === "Contributor") {
    nav = (
      <>
        <NavLink to="/daily" className="navlink-item">
          Daily Game
        </NavLink>
        <NavLink to="/practice" className="navlink-item">
          Practice
        </NavLink>
        <NavLink to={`/bookmarks/${uid}`} className="navlink-item">
          Bookmarks
        </NavLink>
        <NavLink to="/addgame" className="navlink-item">
          Add Questions
        </NavLink>
        <NavLink to={`/profile/${uid}`} className="navlink-item">
          Profile
        </NavLink>
      </>
    );
  } else if (userStatus && userType === "Admin") {
    nav = (
      <>
        <NavLink to="/daily" className="navlink-item">
          Daily Game
        </NavLink>
        <NavLink to="/stats" className="navlink-item">
          Stats
        </NavLink>
        <NavLink to="/practice" className="navlink-item">
          Practice
        </NavLink>
        <NavLink to={`/bookmarks/${uid}`} className="navlink-item">
          Bookmarks
        </NavLink>
        <NavLink to="/reviewgame" className="navlink-item">
          Review Game
        </NavLink>
        <NavLink to="/addgame" className="navlink-item">
          Add Game
        </NavLink>
        <NavLink to={`/profile/${uid}`} className="navlink-item">
          Account
        </NavLink>
      </>
    );
  } else {
    nav = (
      <>
        <NavLink to="/daily" className="navlink-item">
          Daily Game
        </NavLink>
        <NavLink to="/practice" className="navlink-item">
          Practice
        </NavLink>
        <NavLink to={`/bookmarks/${uid}`} className="navlink-item">
          Bookmarks
        </NavLink>
        <NavLink to="/login" className="navlink-item">
          Login
        </NavLink>
      </>
    );
  }

  return (
    <div className="navlink-container">
      <div className="logo">
        <Link to="/" className="nav-title">
          <div className="title-detail">
            <h3>antitrivia</h3>
          </div>
          <p className="title-beta">beta</p>
        </Link>
      </div>

      <div className="desktop-menu">
        <div className="navlinks">{nav}</div>
      </div>
      <div className="mobile-menu">
        <Hamburger menu={nav} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    userStatus: state.userStatus.userStatus,
    userType: state.userType.userType,
    logout: state.logout.logout,
  };
};

export default connect(mapStateToProps)(NavItems);
