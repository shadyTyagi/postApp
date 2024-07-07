import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditPostScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const post = posts.find((p) => p.id === Number(id));
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setImage(post.image);
    }
  }, [id]);

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
    const posts = JSON.parse(localStorage.getItem("posts")) || [];
    const updatedPosts = posts.map((p) =>
      p.id === Number(id) ? { ...p, title, content, image } : p
    );
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    navigate("/");
  };

  return (
    <div className="create-post-container">
      <h1 className="create-post-heading">Edit Post</h1>
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
        {image && (
          <img
            src={image}
            alt={title}
            style={{ width: "100px", height: "100px" }}
          />
        )}
        <div className="submit-button-card">
          <button className="submit-button" type="submit">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostScreen;
