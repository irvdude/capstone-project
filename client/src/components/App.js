import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

function App() {
  useEffect(() => {
    fetch("/tickets")
      .then((r) => r.json())
      .then((tickets) => console.log(tickets));
  }, []);

  return <h1>Logged tickets</h1>;
}

export default App;
