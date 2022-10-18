import React, { useState } from "react";
import { IPost } from "../Types/post.type";
import { IUser } from "../Types/user.type";

type Props = {
  // TODO:
  post: IPost,
  onSubmitComment: (message:string) => void,
  showError: (message: string) => void,
};

const Comment = (props: Props) => {
  const [message, setMessage] = useState("");
  const [sendingComment, setSendingComment] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sendingComment) return;

    try {
      setSendingComment(true);
      await props.onSubmitComment(message);
      setMessage("");
      setSendingComment(false);
    } catch (error) {
      setSendingComment(false);
      props.showError("there was a problem saving the comment. Try again please.");
    }
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
