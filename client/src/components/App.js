import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Tickets from "./Tickets";
import NavBar from "./NavBar";
import SignUp from "./SignUp";

function App() {
  return <h1>Issues</h1>;
}

function Root() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  return (
    <Router>
      <NavBar />
      {user ? (
        <Switch>
          <Route path="/">
            <App />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route path="/signup">
            <SignUp setUser={setUser} />
          </Route>
          {/* <Route path="/login">
            <Login setUser={setUser} />
          </Route> */}
          <Route path="/">
            <App />
          </Route>
        </Switch>
      )}
    </Router>
  );
}

export default Root;
