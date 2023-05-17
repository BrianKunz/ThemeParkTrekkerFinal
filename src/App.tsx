import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TripList from "./components/Trip/TripList";
import PostList from "./components/Post/PostList";
import CreateUser from "./components/User/CreateUser/CreateUser";
import LoginUser from "./components/User/LoginUser/LoginUser";
import Post from "./components/Post/Post";
import HomePage from "./components/Home";
import { useUserStore } from "./stores/useUserStore"; // Update this import path

interface Props {}

const App: React.FC<Props> = () => {
  const { loadUserFromStorage } = useUserStore();

  useEffect(() => {
    loadUserFromStorage();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trips" element={<TripList />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/signup" element={<CreateUser />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
