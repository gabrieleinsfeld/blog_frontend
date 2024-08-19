import { useState, useEffect } from "react";
import "./styles/posts.css";
import "./styles/body.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Link, Navigate } from "react-router-dom";

const PostsAuthor = () => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [change, setChange] = useState(null);
  useEffect(() => {
    fetch(`https://honest-casandra-gabrielsoares-d703f847.koyeb.app/post/`, {
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => {
        setPosts(response);
        setChange(null);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [change]);
  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered </p>;
  const handleDelete = async (postId) => {
    // Step 1: Confirm deletion
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    // Step 2: If user confirmed, proceed with deletion
    if (userConfirmed) {
      const token = localStorage.getItem("authToken"); // Assuming you're using a token for auth

      try {
        const response = await fetch(`http://localhost:3000/post/${postId}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          alert("Post deleted successfully!");
          setChange("changed");
          // Optionally, you can update your UI here, e.g., remove the deleted post from the list
        } else {
          alert("Failed to delete post.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred.");
      }
    }
  };
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };
  console.log(posts);
  return (
    <>
      <div id="body">
        {posts.map((post) => {
          return (
            <div id="post" className="author" key={post.id}>
              <div id="delete-container">
                <button>
                  <Link to={"/edit-post"} state={{ user, post }}>
                    <i>
                      <FontAwesomeIcon
                        style={{ width: 30, height: 30 }}
                        icon={faEdit}
                      />
                    </i>
                  </Link>
                </button>
                <button
                  id="delete-button"
                  onClick={() => {
                    handleDelete(post.id);
                  }}
                >
                  <i>
                    <FontAwesomeIcon
                      style={{ width: 30, height: 30 }}
                      icon={faTrash}
                    />
                  </i>
                </button>
              </div>
              <img src={post.img} alt="image" />
              <Link to={"/post"} state={{ post, user }}>
                <div className="info">
                  <h1>{post.title}</h1>
                  <p>
                    <strong>Author:</strong> Gabriel Soares
                  </p>
                  <p>
                    <strong>Date:</strong> {formatDate(post.createdAt)}
                  </p>
                  <p className="description">{post.description}</p>
                </div>
              </Link>
            </div>
          );
        })}
        <div id="post">
          <Link to={"/add-post"} state={{ user }}>
            <div className="new">+</div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default PostsAuthor;
