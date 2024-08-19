import { Navigate } from "react-router-dom";

const LogOut = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  return <Navigate to="/" state={{ token: null }} />;
};

export default LogOut;
