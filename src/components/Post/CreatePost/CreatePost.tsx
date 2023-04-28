/* eslint-disable no-unused-vars */
import * as React from "react";
import { useCreatePost } from "./useCreatePost";

export default function CreatePost() {
  const { postFormInputs, handlePostFormChange, handlePostSubmit } =
    useCreatePost();

  return (
    <div className="bg-white rounded-md shadow-md p-4 mx-auto my-4 w-full lg:w-3/4 xl:w-1/2">
      <h2 className="text-xl font-bold mb-4">Create Post</h2>
      <form onSubmit={handlePostSubmit} method="POST">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="title"
            value={postFormInputs.title}
            onChange={handlePostFormChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="image">
            Image Link
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="image"
            value={postFormInputs.image}
            onChange={handlePostFormChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            name="description"
            value={postFormInputs.description}
            onChange={handlePostFormChange}
            required
          />
        </div>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
