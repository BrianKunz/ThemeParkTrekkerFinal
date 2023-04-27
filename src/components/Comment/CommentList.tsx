import React, { useEffect } from "react";
import { useCommentStore } from "../../stores/useCommentStore";
import { Comment } from "./Comment";
import CreateComment from "./CreateComment/CreateComment";

export default function CommentList() {
  const { comments, getAllComments } = useCommentStore();
  useEffect(() => {
    getAllComments();
  }, []);

  return (
    <div>
      <h3>Comments</h3>
      <CreateComment />
      {comments.map((comment) => {
        return <Comment key={comment.id} comment={comment} />;
      })}
    </div>
  );
}
