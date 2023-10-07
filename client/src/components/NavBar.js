import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Landing</Link>
        </li>
        <li>
          <Link to="/tickets">Tickets</Link>
        </li>
        <div>
          {user ? (
            <button onClick={handleLogoutClick}>Logout</button>
          ) : (
            <>
              <Link to="/signup">Signup</Link>
              <br></br>
              <Link to="/login">Login</Link>
            </>
          )}
        </div>
      </ul>
    </nav>
  );
}

export default NavBar;
