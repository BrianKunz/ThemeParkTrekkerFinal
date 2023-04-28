import { useState } from "react";
import { useCommentStore } from "../../../stores/useCommentStore";
import { v4 as uuidv4 } from "uuid";
import { Post } from "../../../entities/Post.entity";
import { User } from "../../../entities/User.entity";

interface FormInputs {
  time: Date;
  body: string;
}

export function useCreateComment(post: Post, currentUser: User) {
  const [commentFormInputs, setCommentFormInputs] = useState<FormInputs>({
    time: new Date(),
    body: "",
  });
  const [loadingComments, setLoadingComments] = useState(false);
  const { createNewComment } = useCommentStore();

  const handleCommentFormChange: React.ChangeEventHandler<
    HTMLTextAreaElement
  > = async ({ target: { name, value } }) => {
    setCommentFormInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCommentSubmit = async () => {
    if (loadingComments) {
      return;
    }
    try {
      setLoadingComments(true);
      const commentId = uuidv4();
      await createNewComment(
        {
          id: commentId,
          time: commentFormInputs.time,
          body: commentFormInputs.body,
          post: post,
          user: currentUser!,
        },
        post
      );
      setCommentFormInputs({
        time: new Date(),
        body: "",
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingComments(false);
    }
  };

  return {
    handleCommentFormChange,
    handleCommentSubmit,
    commentFormInputs,
    setCommentFormInputs,
    loadingComments,
  };
}
