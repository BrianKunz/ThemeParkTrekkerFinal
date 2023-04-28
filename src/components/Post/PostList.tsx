import * as React from "react";
import { useEffect } from "react";
import { usePostStore } from "../../stores/usePostStore";
import CreatePost from "./CreatePost/CreatePost";
import NavBar from "../NavBar/NavBar";
import { Link } from "react-router-dom";

export default function PostList() {
  const { posts, getAllPosts } = usePostStore();

  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <div className="bg-gray-200 min-h-screen">
      <NavBar />
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-4xl font-bold text-gray-900 mb-8">Post List</h1>
          <CreatePost />
          {posts &&
            posts.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-md shadow-md overflow-hidden mb-8"
              >
                <Link to={`/posts/${post.id}`}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-64 object-cover"
                  />
                </Link>
                <div className="px-4 py-4">
                  <Link to={`/posts/${post.id}`}>
                    <h2 className="text-xl font-bold text-gray-900 mb-2">
                      {post.title}
                    </h2>
                  </Link>
                  <p className="text-gray-700">{post.description}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
