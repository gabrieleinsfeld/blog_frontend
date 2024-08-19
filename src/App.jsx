import { Link } from "react-router-dom";
import "./styles/App.css";
import Homepage from "./Homepage";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// other imports for Header and ProductDetail

export default function App(props) {
  const { state } = useLocation();
  const token = state?.token;
  useEffect(() => {
    if (token && !localStorage.getItem("authToken")) {
      localStorage.setItem("authToken", token);
    }
  }, [token]);

  return (
    /* We are going to pass the things that we want to inject to these components using the value prop */
    /* This value prop will overwrite the default value */

    <Homepage token={token}></Homepage>
  );
}
