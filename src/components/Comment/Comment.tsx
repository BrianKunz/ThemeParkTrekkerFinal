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
          body,
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
    <div>
      <CreateComment post={post} currentUser={currentUser} />
      {/* <p>{time}</p> */}
      <h4>{body}</h4>
    </div>
  );
};
