import { Link } from "react-router-dom";
import "./styles/navbar.css";
import { useState, useEffect } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import {
  Menu,
  Avatar,
  Box,
  MenuItem,
  MenuList,
  MenuButton,
} from "@chakra-ui/react";
const Navbar = () => {
  const [user, setUser] = useState("");
  const [token, setToken] = useState(localStorage.getItem("authToken"));
  useEffect(() => {
    setToken(localStorage.getItem("authToken"));
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, [token]);
  return (
    <div id="navbar">
      <div className="logo"></div>
      <div className="title">Weblog</div>
      <div className="navigation">
        {token ? (
          <ChakraProvider>
            <Box display="flex" justifyContent="flex-end" p={4}>
              <Menu>
                <MenuButton style={{ float: "right" }}>
                  <Avatar></Avatar>
                </MenuButton>

                <MenuList>
                  <div id="menu-box">
                    <Avatar></Avatar>
                    <span>Welcome Back</span>
                    <span>
                      <strong>{user.username}</strong>
                    </span>
                  </div>
                  <hr />
                  <Link id="menu" to={"/log-out"}>
                    <MenuItem>Log out</MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            </Box>
          </ChakraProvider>
        ) : (
          <>
            <Link to={"/sign-up"}>Sign in</Link>
            <Link to={"/log-in"}>Log in</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
