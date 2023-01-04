import React from "react";
import { Link } from "react-router-dom";

const Menu = ({ setCurrentPage }) => {
  return (
    <div>
      <Link to="/" onClick={() => setCurrentPage("Home")}>
        Home
      </Link>
      <Link to="/members" onClick={() => setCurrentPage("Members")}>
        Members
      </Link>
      <Link to="/favorites" onClick={() => setCurrentPage("Favorites")}>
        Favorites
      </Link>
      <Link t0="events" onClick={() => setCurrentPage("Events")}>
        Events
      </Link>
    </div>
  );
};

export default Menu;
