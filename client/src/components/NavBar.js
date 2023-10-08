import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import Tickets from "./Tickets";

function NavBar({ user, setUser }) {
  function handleLogoutClick() {
    fetch("/logout", { method: "DELETE" }).then((r) => {
      if (r.ok) {
        setUser(null);
      }
    });
  }

  return (
    <header>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        {user ? (
          <div>
            <Link to="/tickets">Tickets</Link>
            <br></br>
            <button onClick={handleLogoutClick}>Logout</button>
          </div>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <br></br>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </header>
  );
}

export default NavBar;
