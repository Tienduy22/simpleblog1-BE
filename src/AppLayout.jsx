import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles.css";

import Login from "./components/Login";
import NewPost from "./components/NewPost";
import Post from "./components/Post";
import PostLists from "./components/PostLists";
import ProtectedRoute from "./components/ProtectedRoute";
import Stats from "./components/Stats";
import Posts from "./components/Posts";
import Home from "./components/Home";
import About from "./components/About";
import NoMatch from "./components/NoMatch";

export default function AppLayout() {
  const [user, setUser] = useState(null);

  const logOut = () => {
    setUser(null);
  };

  return (
    <Router>
      <nav style={{ margin: 10 }}>
        <Link to="/" style={{ padding: 5 }}>
          Home
        </Link>
        <Link to="/posts" style={{ padding: 5 }}>
          Posts
        </Link>
        <Link to="/about" style={{ padding: 5 }}>
          About
        </Link>
        <span> | </span>
        {user && (
          <Link to="/stats" style={{ padding: 5 }}>
            Stats
          </Link>
        )}
        {user && (
          <Link to="/newpost" style={{ padding: 5 }}>
            New Post
          </Link>
        )}
        {!user && (
          <Link to="/login" style={{ padding: 5 }}>
            Login
          </Link>
        )}
        {user && (
          <span onClick={logOut} style={{ padding: 5, cursor: "pointer" }}>
            Logout
          </span>
        )}
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />}>
          <Route index element={<PostLists />} />
          <Route path=":slug" element={<Post />} />
        </Route>
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login onLogin={setUser} />} />
        <Route
          path="/stats"
          element={
            <ProtectedRoute user={user}>
              <Stats />
            </ProtectedRoute>
          }
        />
        <Route
          path="/newpost"
          element={
            <ProtectedRoute user={user}>
              <NewPost />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </Router>
  );
}
