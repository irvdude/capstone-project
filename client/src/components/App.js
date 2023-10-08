import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";
import Tickets from "./Tickets";
import NavBar from "./NavBar";
import SignUp from "./SignUp";
import Login from "./Login";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";

function App({ user }) {
  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (user) {
    return (
      <div>
        <h1>Issues</h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
        {/* Display search results or other components here */}
      </div>
    );
  } else {
    return <h1>Log in or Sign up to view/create tickets</h1>;
  }
}

function Root() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // auto-login
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <NavBar user={user} setUser={setUser} />
      <main>
        {user ? (
          <Switch>
            <Route exact path="/">
              <App />
            </Route>
            <Route exact path="/tickets">
              <Tickets />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route exact path="/signup">
              <SignUp setUser={setUser} />
            </Route>
            <Route exact path="/login">
              <Login setUser={setUser} />
            </Route>
            <Route exact path="/">
              <App />
            </Route>
          </Switch>
        )}
      </main>
    </BrowserRouter>
  );
}

export default Root;
