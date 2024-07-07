import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./PostsDisplayScreen.css";

const PostsDisplayScreen = () => {
  const defaultPosts = [
    {
      id: 1,
      title: "First Post",
      content: "This is the content of the first post.",
      image:
        "https://res.cloudinary.com/dzaz9bsnw/image/upload/v1719728414/Be_Athah_x_Chakras-06_awqbqa.svg",
    },
    {
      id: 2,
      title: "Second Post",
      content: "This is the content of the second post.",
      image:
        "https://res.cloudinary.com/dzaz9bsnw/image/upload/v1719568249/logo_kqamyx.png",
    },
  ];

  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts"));
    if (savedPosts && savedPosts.length > 0) {
      setPosts(savedPosts);
    } else {
      localStorage.setItem("posts", JSON.stringify(defaultPosts));
      setPosts(defaultPosts);
    }
  }, []);

  const handleDelete = (id) => {
    const updatedPosts = posts.filter((post) => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
  };

  return (
    <div className="post-container">
      <div className="create-new-post-btn-card">
        <Link to="/create">
          <button className="create-new-post-btn">Create New Post</button>
        </Link>
      </div>
      <h1 className="post-heading">Posts</h1>
      {posts.map((post) => (
        <div className="content-card" key={post.id}>
          <h2 className="post-title-heading">{post.title}</h2>
          <p className="post-content">{post.content}</p>
          {post.image && (
            <img className="post-image" src={post.image} alt={post.title} />
          )}
          <div className="post-edit-delete-btn-card">
            <Link to={`/edit/${post.id}`}>
              <button className="edit-btn">Edit</button>
            </Link>
            <button
              className="delete-btn"
              onClick={() => handleDelete(post.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsDisplayScreen;
