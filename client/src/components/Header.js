import React, { useState } from "react";
import { Link } from "react-router-dom";
import Auth from "../utils/auth";

const Header = () => {
  const [currentPage, setCurrentPage] = useState("");
  const loggedIn = Auth.loggedIn();
  return (
    <header>
      <Link to="/" onClick={() => setCurrentPage("Home")}>
        <img src="./loud-logo.png" alt="loud logo" height="50" />
      </Link>

      {loggedIn && (
        <>
          <Link to="/settings" onClick={() => setCurrentPage("Settings")}>
            Settings
          </Link>
          <Link to="/profile" onClick={() => setCurrentPage("Profile")}>
            Profile
          </Link>
        </>
      )}
    </header>
  );
};

export default Header;
