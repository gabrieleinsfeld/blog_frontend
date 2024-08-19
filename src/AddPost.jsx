import { Center } from "@chakra-ui/react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./styles/add-post.css";
const AddPost = () => {
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
  const [title, setTitle] = useState("");
  const [img, setImage] = useState("");
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");

  // Handle form submission
  const handleSubmit = async (event) => {
    const token = localStorage.getItem("authToken");
    event.preventDefault();
    try {
      const response = await fetch(
        "https://honest-casandra-gabrielsoares-d703f847.koyeb.app/post",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            // 'Content-Type': 'multipart/form-data' // Do not set Content-Type for FormData
          },

          body: JSON.stringify({ title, img, content, description }),
        }
      );

      if (response.ok) {
        console.log(response);
        alert("Post added successfully!");
        setTitle("");
        setImage("");
        setContent("");
        setDescription("");
      } else {
        alert("Failed to add post.");
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
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
};

export default AddPost;
