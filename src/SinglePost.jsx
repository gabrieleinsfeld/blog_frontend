import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import "./styles/posts.css";
import { ChakraProvider } from "@chakra-ui/react";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThumbsUp,
  faPaperPlane,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { Avatar, Button, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
const SinglePost = () => {
  const { state } = useLocation();
  const [commentValue, setCommentValue] = useState("");
  const [post, setPost] = useState(state?.post);
  const [userType, setUserType] = useState(state?.user?.userType);
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentLike, setCurrentLike] = useState(0);
  const [likeId, setLikeId] = useState(null);
  const [liked, setLiked] = useState(false);
  const [token, setToken] = useState(null);
  const paragraphs = post.content.split("|");
  const currentToken = localStorage.getItem("authToken");
  useEffect(() => {
    setToken(localStorage.getItem("authToken"));
    if (currentToken) {
      fetch(
        `https://honest-casandra-gabrielsoares-d703f847.koyeb.app/like/post/status/${post.id}`,
        {
          headers: {
            Authorization: `Bearer ${currentToken}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.liked) {
            setLiked(true);

            setLikeId(data.likeId);
          } else {
            setLiked(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching like status:", error);
        });
    }
  }, [post.id]);

  const handleLike = async (e) => {
    setToken(localStorage.getItem("authToken"));

    if (token && !liked) {
      fetch(
        "https://honest-casandra-gabrielsoares-d703f847.koyeb.app/like/post",
        {
          method: "POST", // Specify the request method
          headers: {
            "Content-Type": "application/json", // Specify the content type
            Authorization: `Bearer ${token}`, // Replace with your actual token
          },
          body: JSON.stringify({
            postId: post.id,
          }),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setLikeId(data.like);
          setCurrentLike(currentLike + 1);
        })
        .then(() => {
          setLiked(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else if (token && liked) {
      fetch(
        `https://honest-casandra-gabrielsoares-d703f847.koyeb.app/like/${likeId}`,
        {
          method: "DELETE", // Specify the request method
          headers: {
            "Content-Type": "application/json", // Specify the content type
            Authorization: `Bearer ${token}`, // Replace with your actual token
          },
        }
      )
        .then((response) => response.json())
        .then(() => {
          setCurrentLike(currentLike - 1);
          setLiked(false);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setLoggedIn(false);
    }
  };
  const fetchPost = async () => {
    fetch(
      `https://honest-casandra-gabrielsoares-d703f847.koyeb.app/post/${post.id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      }
    )
      .then((response) => {
        if (response.status >= 400) {
          throw new Error("server error");
        }
        return response.json();
      })
      .then((response) => {
        setCommentValue("");
        setPost(response[0]);
      })
      .catch((error) => console.log(error));
  };

  const handleCommentSubmission = async () => {
    setToken(localStorage.getItem("authToken"));
    if (!token) {
      setLoggedIn(false);
    } else {
      if (commentValue === "") {
        return;
      }
      try {
        const response = await fetch(
          "https://honest-casandra-gabrielsoares-d703f847.koyeb.app/comment",
          {
            method: "POST", // Specify the HTTP method
            headers: {
              "Content-Type": "application/json", // Specify the content type
              Authorization: `Bearer ${token}`, // Include the authorization header
            },
            body: JSON.stringify({
              postId: post.id, // Include the postId in the request body
              message: commentValue, // Include the message in the request body
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
      } catch (error) {
        console.error("Error posting comment:", error);
      }
      fetchPost();
    }
  };
  const handleDelete = async (messageId) => {
    // Step 1: Confirm deletion
    const userConfirmed = window.confirm(
      "Are you sure you want to delete this comment?"
    );
    if (userConfirmed) {
      const token = localStorage.getItem("authToken"); // Assuming you're using a token for auth

      try {
        const response = await fetch(
          `https://honest-casandra-gabrielsoares-d703f847.koyeb.app/comment/${messageId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          fetchPost();
          alert("Comment deleted successfully!");
        } else {
          alert("Failed to delete comment.");
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
  if (!loggedIn) {
    return <Navigate to="/log-in" />;
  }

  return (
    <ChakraProvider>
      <div id="single-post-container" key={post.id}>
        <img src={post.img} alt="image" />
        <div className="info">
          <h1>{post.title}</h1>
          <p>
            <strong>Author:</strong> Gabriel Soares
          </p>
          <p>
            <strong>Date:</strong> {formatDate(post.createdAt)}
          </p>
          <p className="description">{post.description}</p>
          <hr />
        </div>
        {paragraphs.map((paragraph, index) => {
          return (
            <p className="paragraph" key={index}>
              {paragraph}
            </p>
          );
        })}
        <Button
          onClick={handleLike}
          style={{
            borderRadius: 25,
            width: 50,
            height: 50,
          }}
          size="lg"
        >
          <i>
            <FontAwesomeIcon
              style={{
                width: 25,
                height: 25,
                color: liked ? "#1877F2" : "gray",
              }}
              icon={faThumbsUp}
            />
          </i>
        </Button>
        <p>
          <strong>{post.likes.length + currentLike}</strong> people liked
        </p>
        <div id="comment-section">
          <div className="comment-input-container">
            <Avatar></Avatar>
            <textarea
              placeholder="Add a comment..."
              className="comment-input"
              value={commentValue}
              onChange={(e) => {
                setCommentValue(e.target.value);
              }}
            />
            <Button
              onClick={handleCommentSubmission}
              style={{ borderRadius: 25, width: 50, height: 50 }}
              size="lg"
            >
              <i>
                <FontAwesomeIcon
                  style={{ width: 25, height: 25 }}
                  icon={faPaperPlane}
                />
              </i>
            </Button>
          </div>
          <div className="comments-list">
            {post.comments.length ? (
              post.comments.map((comment) => (
                <div key={comment.id} className="comment">
                  <Avatar size="sm" />
                  <div className="comment-content">
                    <p>
                      <strong>{comment.user.username}</strong>
                    </p>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <span style={{ flexGrow: 1 }}>{comment.message}</span>
                      {userType === "author" && (
                        <button
                          onClick={() => {
                            handleDelete(comment.id);
                          }}
                        >
                          <i>
                            <FontAwesomeIcon
                              style={{ width: 25, height: 25 }}
                              icon={faTrash}
                            />
                          </i>
                        </button>
                      )}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
};

export default SinglePost;
