import { Center } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./styles/add-post.css";
const EditPost = () => {
  //   const storedUser = localStorage.getItem("user");
  //   const user = JSON.parse(storedUser);
  const { state } = useLocation();
  if (!state) {
    return (
      <div
        style={{
          paddingTop: 100,
          width: "100vw",
          display: "flex",
          justifyContent: "center",
        }}
      >
        You are not authorized to view this page
      </div>
    );
  }
  const [user, setUser] = useState(state?.user);
  const [post, setPost] = useState(state?.post);

  if (user.userType != "author") {
    return (
      <div
        style={{
          paddingTop: 100,
          width: "100vw",
          display: "flex",
          justifyContent: "center",
        }}
      >
        You are not authorized to view this page
      </div>
    );
  }
  // State hooks for form fields
  const [title, setTitle] = useState(post.title);
  const [img, setImage] = useState(post.img);
  const [content, setContent] = useState(post.content);
  const [description, setDescription] = useState(post.description);
  const id = post.id;
  // Handle form submission
  const handleSubmit = async (event) => {
    const token = localStorage.getItem("authToken");
    event.preventDefault();
    try {
      const response = await fetch(
        "https://honest-casandra-gabrielsoares-d703f847.koyeb.app/post",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ title, img, id, content, description }),
        }
      );

      if (response.ok) {
        alert("Post Updated successfully!");
        setTitle("");
        setImage("");
        setContent("");
        setDescription("");
      } else {
        alert("Failed to update post.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  };
  return (
    <div id="add-post">
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Image Url"
            id="image"
            value={img}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            placeholder="Title"
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Description (one paragraph summarizing the article)"
          ></textarea>
        </div>
        <div>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="Your content goes here, please make sure that you separate new paragraphs with | ."
          ></textarea>
        </div>
        <button type="submit">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
