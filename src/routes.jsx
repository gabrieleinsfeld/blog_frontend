import App from "./App";
import ErrorPage from "./ErrorPage";
import LogIn from "./LogIn";
import LogOut from "./LogOut";
import SinglePost from "./SinglePost";
import SignUp from "./SignUp";
import PostsAuthor from "./PostsAuthor";
import AddPost from "./AddPost";
import EditPost from "./EditPost";
const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/log-in",
    element: <LogIn />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/post",
    element: <SinglePost />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/log-out",
    element: <LogOut></LogOut>,
    errorElement: <ErrorPage />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/author",
    element: <PostsAuthor />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/add-post",
    element: <AddPost />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/edit-post",
    element: <EditPost />,
    errorElement: <ErrorPage />,
  },
];

export default routes;
