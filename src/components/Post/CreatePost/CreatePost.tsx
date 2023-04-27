import React from "react";
import { useCreatePost } from "./useCreatePost";

export default function CreatePost() {
  const { postFormInputs, handlePostFormChange, handlePostSubmit } =
    useCreatePost();

  return (
    <form onSubmit={handlePostSubmit} method="POST">
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        value={postFormInputs.title}
        onChange={handlePostFormChange}
        required
      />
      <label htmlFor="image">Image Link</label>
      <input
        type="text"
        name="image"
        value={postFormInputs.image}
        onChange={handlePostFormChange}
      />
      <label htmlFor="description">Description</label>
      <input
        type="text"
        name="description"
        value={postFormInputs.description}
        onChange={handlePostFormChange}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
}
