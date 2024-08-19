import "./styles/sign-in.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
const LogIn = () => {
  const [token, setToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://honest-casandra-gabrielsoares-d703f847.koyeb.app/log-in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        // Store token, etc.
        if (data) {
          setToken(data.token);
          localStorage.setItem("user", JSON.stringify(data.user));
          setLoggedIn(true);
        }
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };
  if (loggedIn) {
    return <Navigate to="/" state={{ token }} />;
  }
  return (
    <div id="sign-in-container">
      <div id="sign-in">
        <span id="title">Login Form</span>
        <div id="log-in-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">
              <i className="fa-solid fa-envelope">
                <FontAwesomeIcon icon={faUser} />
              </i>
              <input
                required
                type="email"
                placeholder="Username"
                name="username"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
            </label>
            <label htmlFor="password">
              <i className="fa-solid fa-lock">
                <FontAwesomeIcon icon={faLock} />
              </i>
              <input
                required
                placeholder="Password"
                type="password"
                value={password}
                name="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </label>
            <button type="submit">Log In</button>
            <span>
              Not a member? <Link to="/sign-up">Sign up</Link>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
