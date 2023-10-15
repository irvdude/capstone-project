import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Tickets from "./Tickets";
import NavBar from "./NavBar";
import SignUp from "./SignUp";
import Login from "./Login";
import NewTicket from "./NewTicket";
import CommentsByTicket from "./Comments";

function App({ user, tickets, setTickets }) {
  useEffect(() => {
    fetch("/tickets")
      .then((r) => r.json())
      .then((data) => setTickets(data));
  }, []);

  const [searchTerm, setSearchTerm] = useState("");
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // const addTicket = (newTicket) => {
  //   const ticketsArray = [...tickets, newTicket];
  //   setTickets(ticketsArray);
  // };

  // const updateTicket = (updatedTicket) => {
  //   const newTicketArray = tickets.map((ticket) => {
  //     if (ticket.id === updatedTicket.id) return updatedTicket;
  //     else return ticket;
  //   });
  //   setTickets(newTicketArray); // Fixed typo here
  // };

  // const deleteTicket = (id) => {
  //   const newTicketArray = tickets.filter((ticket) => ticket.id !== id);
  //   setTickets(newTicketArray); // Fixed typo here
  // };

  // const displayedTickets = tickets.filter((ticket) => {
  //   return ticket.title.toLowerCase().includes(searchTerm.toLowerCase());
  // });
  console.log(tickets);

  if (user) {
    const filteredTickets = tickets.filter(
      (ticket) =>
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.body.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div>
        <h1>Issues</h1>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <ul>
          {filteredTickets.map((ticket) => (
            <li key={ticket.id}>
              {ticket.title} - {ticket.body}
            </li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <h1>Log in or Sign up to view/create tickets</h1>;
  }
}

function Root() {
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch("/check_session").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

  const addTicket = (newTicket) => {
    const ticketsArray = [...tickets, newTicket];
    setTickets(ticketsArray);
  };

  const handleDeleteTicket = (id) => {
    const ticketsArray = tickets.filter((ticket) => ticket.id !== id);
    setTickets(ticketsArray);
  };

  const handleDeleteClick = async (id) => {
    const response = await fetch(`/tickets/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      handleDeleteTicket(id);
      alert("Delete Successful. Please Refresh.");
    }
  };

  return (
    <BrowserRouter>
      <NavBar user={user} setUser={setUser} />
      <main>
        {user ? (
          <Switch>
            <Route exact path="/">
              <App user={user} tickets={tickets} setTickets={setTickets} />
            </Route>
            <Route exact path="/tickets">
              <Tickets
                tickets={tickets}
                setTickets={setTickets}
                handleDeleteClick={handleDeleteClick}
              />
            </Route>
            <Route exact path="/comments/:ticketId">
              <CommentsByTicket userId={user.id} />
            </Route>
            <Route exact path="/addtickets">
              <NewTicket addTicket={addTicket} />
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
              <App user={user} tickets={tickets} setTickets={setTickets} />
            </Route>
          </Switch>
        )}
      </main>
    </BrowserRouter>
  );
}

export default Root;
