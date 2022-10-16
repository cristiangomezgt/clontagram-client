import React, { useState } from "react";

type Props = {
  // TODO:
  /* onSubmitComment: () => void;
  showError: (message: string) => void; */
};

const Comment = (props: Props) => {
  const [message, setMessage] = useState("");

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }

  return (
    <form className="Post__comentario-form-container" onSubmit={onSubmit}>
      <input
        type="text"
        placeholder="Leave a comment..."
        required
        maxLength={180}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Post</button>
    </form>
  );
};

export default Comment;
