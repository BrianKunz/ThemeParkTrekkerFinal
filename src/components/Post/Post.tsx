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
    return <div className="text-center">Loading...</div>;
  }

  if (!post) {
    return <div className="text-center">No post found</div>;
  }

  return (
    <div>
      <NavBar />
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
        <img src={post.image} alt={post.title} className="max-w-2xl mb-4" />
        <p className="mb-4">{new Date(post.created).toLocaleString()}</p>
        <p>{post.description}</p>
      </div>
    </div>
  );
};

export default Post;
