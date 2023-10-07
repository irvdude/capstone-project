import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

function NavBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Landing</Link>
        </li>
        <li>
          <Link to="/tickets">Tickets</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
