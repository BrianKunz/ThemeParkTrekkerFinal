import React, { useEffect } from "react";
import { useCommentStore } from "../../stores/useCommentStore";
import { Comment } from "./Comment";
import CreateComment from "./CreateComment/CreateComment";
import { Post } from "../../entities/Post.entity";
import { User } from "../../entities/User.entity";

interface Props {
  post: Post;
  currentUser: User;
}

export const CommentList: React.FC<Props> = ({ post, currentUser }) => {
  const { comments, getAllComments } = useCommentStore();
  useEffect(() => {
    getAllComments(post);
  }, [post]);

  return (
    <div>
      <h3>Comments</h3>
      <CreateComment post={post} currentUser={currentUser} />
      {comments.map((comment) => {
        return (
          <Comment
            key={comment.id}
            comment={comment}
            post={post}
            currentUser={currentUser}
          />
        );
      })}
    </div>
  );
};
