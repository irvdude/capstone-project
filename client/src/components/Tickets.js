import React, { useEffect, useState } from "react";

function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch("/tickets")
      .then((r) => r.json())
      .then((data) => setTickets(data));
  }, []);

  return (
    <div>
      <h1>All Tickets</h1>
      <ul>
        {tickets.map((ticket) => (
          <li key={ticket.id}>
            {ticket.title} - {ticket.body}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tickets;
