import "./styles/sign-in.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { Navigate, Link } from "react-router-dom";
const SignUp = () => {
  const [token, setToken] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [signedUp, setSignedUp] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== confirmedPassword) {
      alert("Passwords do not match. Please try again.");
      return; // Prevent form submission
    }
    try {
      const response = await fetch(
        "https://honest-casandra-gabrielsoares-d703f847.koyeb.app/sign-up",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ firstName, lastName, username, password }),
        }
      );

      if (response.ok) {
        setSignedUp(true);
      } else {
        console.error("SignUp failed");
      }
    } catch (error) {
      console.error("Error during SignUp:", error);
    }
  };
  if (signedUp) {
    return <Navigate to="/log-in" state={{ token }} />;
  }
  return (
    <div id="sign-in-container">
      <div id="sign-in">
        <span id="title">Sign Up Form</span>
        <div id="log-in-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="firstName">
              <i className="fa-solid fa-envelope">
                <FontAwesomeIcon icon={faUser} />
              </i>
              <input
                required
                type="text"
                placeholder="Fisrt Name"
                name="firstName"
                value={firstName}
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
              />
            </label>
            <label htmlFor="firstName">
              <i className="fa-solid fa-envelope">
                <FontAwesomeIcon icon={faUser} />
              </i>
              <input
                required
                type="text"
                placeholder="Last Name"
                name="lastName"
                value={lastName}
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
              />
            </label>
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
            <label htmlFor="confirmedPassword">
              <i className="fa-solid fa-lock">
                <FontAwesomeIcon icon={faLock} />
              </i>
              <input
                required
                placeholder="Confirm Password"
                type="password"
                value={confirmedPassword}
                name="confirmedPassword"
                onChange={(event) => {
                  setConfirmedPassword(event.target.value);
                }}
              />
            </label>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
