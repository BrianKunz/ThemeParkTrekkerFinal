import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Switch } from "react-dom";
import TripList from "./components/Trip/TripList";
import PostList from "./components/Post/PostList";
import CreateUser from "./components/User/CreateUser/CreateUser";
import LoginUser from "./components/User/LoginUser/LoginUser";
import Post from "./components/Post/Post";
import HomePage from "./components/Home";

const App: React.FC = () => {
  return (
    <main className="App">
      <Switch>
        <Route path="/" element={<HomePage />} />
        <Route path="/trips" element={<TripList />} />
        <Route path="/posts" element={<PostList />} />
        <Route path="/posts/:id" element={<Post />} />
        <Route path="/signup" element={<CreateUser />} />
        <Route path="/login" element={<LoginUser />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Switch>
    </main>
  );
};

export default App;
