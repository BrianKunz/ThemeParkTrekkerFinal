import React from "react";
import { useCreateComment } from "./useCreateComment";
import { Post } from "../../../entities/Post.entity";
import { User } from "../../../entities/User.entity";

interface Props {
  post: Post;
  currentUser: User;
}

export default function CreateComment({ post, currentUser }: Props) {
  const {
    commentFormInputs,
    handleCommentFormChange,
    handleCommentSubmit,
    loadingComments,
  } = useCreateComment(post, currentUser);

  return (
    <form onSubmit={handleCommentSubmit} method="POST">
      <label htmlFor="body">Comment</label>
      <input
        type="text"
        name="body"
        value={commentFormInputs.body}
        onChange={handleCommentFormChange}
        required
      />
      <button type="submit" disabled={loadingComments}>
        Submit
      </button>
    </form>
  );
}
