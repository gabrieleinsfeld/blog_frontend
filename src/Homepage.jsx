import Navbar from "./Navbar";
import Posts from "./Posts";
import PostsAuthor from "./PostsAuthor";
import "./styles/body.css";
const Homepage = () => {
  const storedUser = localStorage.getItem("user");
  const user = JSON.parse(storedUser);

  return (
    <div>
      <Navbar></Navbar>
      {user && user.userType === "author" ? <PostsAuthor /> : <Posts />}
    </div>
  );
};

export default Homepage;
