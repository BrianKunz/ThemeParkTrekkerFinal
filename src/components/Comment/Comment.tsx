import React, { useState } from "react";
import { useCommentStore } from "../../stores/useCommentStore";
import CreateComment from "./CreateComment/CreateComment";
import { Post } from "../../entities/Post.entity";
import { User } from "../../entities/User.entity";

interface Props {
  comment: {
    id: string;
    time: Date;
    body: string;
  };
  post: Post;
  currentUser: User;
}

export const Comment: React.FC<Props> = ({
  comment: { id, time, body },
  post,
  currentUser,
}) => {
  const { updateComment, deleteComment } = useCommentStore();
  const [loading, setLoading] = useState(false);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = async ({
    target: { value },
  }) => {
    console.log({ value });
    if (loading || !post) {
      return;
    }
    setLoading(true);
    try {
      await updateComment(
        {
          id,
          time,
          body: value,
          post: post,
          user: currentUser,
        },
        post
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentDelete = () => {
    if (!id) {
      return;
    }
    deleteComment(id, post);
  };

  return (
    <div className="my-4 p-4 border rounded-lg">
      <CreateComment post={post} currentUser={currentUser} />
      <div className="my-2">{time.toLocaleString()}</div>
      <div className="mb-2">
        <input
          type="text"
          value={body}
          onChange={handleChange}
          className="border border-gray-300 rounded-lg p-2"
        />
      </div>
      <button
        disabled={loading}
        onClick={handleCommentDelete}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Delete
      </button>
    </div>
  );
};
