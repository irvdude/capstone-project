import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Tickets({ handleDeleteClick }) {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch("/tickets")
      .then((r) => r.json())
      .then((data) => setTickets(data));
  }, []);

  const history = useHistory();

  const goToComments = (ticketId) => {
    history.push(`/comments/${ticketId}`);
  };

  return (
    <div>
      <h1>All Tickets</h1>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id}>
            {ticket.title} - {ticket.body}
            <button onClick={() => goToComments(ticket.id)}>Comments</button>
            <button onClick={() => handleDeleteClick(ticket.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tickets;
