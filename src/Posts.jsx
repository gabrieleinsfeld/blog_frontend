import { useState, useEffect } from "react";
import "./styles/posts.css";
import "./styles/body.css";

import { Link, Navigate } from "react-router-dom";
const getPosts = () => {
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { posts, error, loading };
};

const Posts = () => {
  const { posts, error, loading } = getPosts();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered </p>;
  const formatDate = (isoDateString) => {
    const date = new Date(isoDateString);
    const options = { day: "numeric", month: "long", year: "numeric" };
    return date.toLocaleDateString(undefined, options);
  };
  if (posts.name == "PrismaClientKnownRequestError") {
    return <div>No posts to see here yet</div>;
  }
  return (
    <>
      <div id="body">
        {posts.map((post) => {
          return (
            <div id="post" key={post.id}>
              <img src={post.img} alt="image" />
              <Link to={"/post"} state={{ post }}>
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
              <hr />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Posts;
