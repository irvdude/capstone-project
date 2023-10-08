import React, { useEffect, useState } from "react";

function Tickets() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetch("/tickets")
      .then((r) => r.json())
      .then((data) => setTickets(data));
  }, []);


  //   const updateTicket = (updatedTicket) => {
  //     const newTicketArray = tickets.map((ticket) => {
  //       if (ticket.id === updatedTicket.id) return updatedTicket;
  //       else return ticket;
  //     });
  //     setTickets(newTicketArray); // Fixed typo here
  //   };

  //   const deleteTicket = (id) => {
  //     const newTicketArray = tickets.filter((ticket) => ticket.id !== id);
  //     setTickets(newTicketArray); // Fixed typo here
  //   };

  //   const displayedTickets = tickets.filter((ticket) => {
  //     return ticket.name.toLowerCase().includes(searchTerm.toLowerCase());
  //   });

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
