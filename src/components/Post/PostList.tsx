/* eslint-disable no-unused-vars */
import * as React from "react";
import { useEffect } from "react";
import { usePostStore } from "../../stores/usePostStore";
import CreatePost from "./CreatePost/CreatePost";
import NavBar from "../NavBar/NavBar";

export default function PostList() {
  const { posts, getAllPosts } = usePostStore();

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div>
      <NavBar />
      <h1>Post List</h1>
      <CreatePost />
      {posts &&
        posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
          </div>
        ))}
    </div>
  );
}
