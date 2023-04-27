import { useState } from "react";
import { usePostStore } from "../../../stores/usePostStore";
import { v4 as uuidv4 } from "uuid";
import { useUserStore } from "../../../stores/useUserStore";

interface FormInputs {
  title: string;
  image?: string;
  description: string;
  created: Date;
  comments: Comment[];
}

export function useCreatePost() {
  const [postFormInputs, setPostFormInputs] = useState<FormInputs>({
    title: "",
    image: "",
    description: "",
    created: new Date(),
    comments: [],
  });
  const [loadingPosts, setLoadingPosts] = useState(false);
  const { createNewPost } = usePostStore();
  const { currentUser } = useUserStore();
  const handlePostFormChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target: { name, value },
  }) => {
    setPostFormInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handlePostSubmit = async () => {
    if (loadingPosts) {
      return;
    }
    try {
      setLoadingPosts(true);
      const postId = uuidv4();
      await createNewPost({
        id: postId,
        created: postFormInputs.created,
        title: postFormInputs.title,
        image: postFormInputs.image,
        description: postFormInputs.description,
        comments: [],
        user: currentUser!,
      });
      setPostFormInputs({
        created: new Date(),
        title: "",
        image: "",
        description: "",
        comments: [],
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingPosts(false);
    }
  };

  return {
    handlePostSubmit,
    handlePostFormChange,
    postFormInputs,
    setPostFormInputs,
    loadingPosts,
  };
}
