import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PostsDisplayScreen from "./components/PostsDisplayScreen";
import CreatePostScreen from "./components/CreatePostScreen";
import EditPostScreen from "./components/EditPostScreen";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<PostsDisplayScreen />} />
          <Route path="/create" element={<CreatePostScreen />} />
          <Route path="/edit/:id" element={<EditPostScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
