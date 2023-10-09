import { useState } from "react";

function NewTicket({ addTicket }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    fetch("/tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        body: body,
      }),
    })
      .then((r) => r.json())
      .then((newTicket) => addTicket(newTicket));
  }

  return (
    <div>
      <h2>New Ticket</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Ticket Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          name="body"
          placeholder="Ticket Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit">Add Ticket</button>
      </form>
    </div>
  );
}

export default NewTicket;
