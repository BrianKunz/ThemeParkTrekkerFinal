import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePostStore } from "../../stores/usePostStore";
import NavBar from "../NavBar/NavBar";

interface Props {}

const Post: React.FC<Props> = () => {
  const { id = "" } = useParams();
  const { getOnePost, post } = usePostStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      await getOnePost(id);
      setLoading(false);
    }

    fetchPost();
  }, [getOnePost, id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>No post found</div>;
  }

  return (
    <div>
      <NavBar />
      <h1>{post.title}</h1>
      <img src={post.image} />
      {/* <p>{post.created}</p> */}
      <p>{post.description}</p>
    </div>
  );
};

export default Post;
