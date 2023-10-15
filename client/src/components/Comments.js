import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function CommentsByTicket({ userId }) {
  const [comments, setComments] = useState([]);
  const [commentBody, setCommentBody] = useState("");
  const { ticketId } = useParams();

  useEffect(() => {
    // Fetch comments
    fetch(`/tickets/${ticketId}/comments`)
      .then((response) => response.json())
      .then((data) => setComments(data));
  }, [ticketId]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    // Post the new comment
    fetch(`/tickets/${ticketId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        body: commentBody,
        user_id: userId,
      }),
    })
      .then((response) => response.json())
      .then((newComment) => {
        setComments([...comments, newComment]);
        setCommentBody("");
      });
  };

  return (
    <div>
      <h2>Comments</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>{comment.body}</li>
        ))}
      </ul>
      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={commentBody}
          onChange={(e) => setCommentBody(e.target.value)}
          placeholder="Add a comment..."
        />
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
}

export default CommentsByTicket;
