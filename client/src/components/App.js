import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import Tickets from "./Tickets";
import NavBar from "./NavBar";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  return <h1>Issues</h1>;
}

function Root() {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route exact path="/tickets">
          <Tickets />
        </Route>
        {/* Add other routes here if needed */}
      </Switch>
    </Router>
  );
}

export default Root;
