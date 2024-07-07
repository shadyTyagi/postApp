import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreatePostScreen.css";

const CreatePostScreen = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = { id: Date.now(), title, content, image };
    let posts = JSON.parse(localStorage.getItem("posts")) || [];
    posts.push(newPost);
    localStorage.setItem("posts", JSON.stringify(posts));
    navigate("/");
  };

  return (
    <div className="create-post-container">
      <h1 className="create-post-heading">Create Post</h1>
      <form className="create-post-form" onSubmit={handleSubmit}>
        <input
          className="create-tital-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          className="create-content-tital"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Content"
          required
          rows={15}
        />
        <input
          className="image-input"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
        />
        <div className="submit-button-card">
          <button className="submit-button" type="submit">
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePostScreen;
