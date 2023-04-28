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
    <form
      onSubmit={handleCommentSubmit}
      method="POST"
      className="my-4 mx-auto w-full lg:w-3/4 xl:w-1/2 bg-gray-200 rounded-md p-4"
    >
      <label htmlFor="body" className="block font-bold text-lg mb-2">
        Comment
      </label>
      <textarea
        className="border rounded py-2 px-3 mb-2 w-full"
        name="body"
        value={commentFormInputs.body}
        onChange={handleCommentFormChange}
        required
      />
      <button
        type="submit"
        disabled={loadingComments}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
}
