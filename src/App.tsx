import React, { Dispatch, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { green, purple } from "@mui/material/colors";
import { Route, Routes } from "react-router";

import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import PageNotFound from "./pages/PageNotFound";
import useWindowSize from "./hooks/useWindowSize";
import PostNewMemory from "./pages/PostNewMemory";
import LikedMemories from "./pages/LikedMemories";
import PostDetails from "./pages/PostDetails";
import MyPosts from "./pages/MyPosts";
import Profile from "./pages/Profile";
import { useAppSelector } from "./store/store";
import SignIn from "./pages/SignIn";
import { useDispatch } from "react-redux";
import { autoLogin } from "./store/actions/authActions";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";

const theme = createTheme({
  palette: {
    primary: {
      main: purple[600],
    },
    secondary: {
      main: green[500],
    },
  },
});

function App() {
  const size = useWindowSize();
  const user = useAppSelector((state) => state.auth.user);
  const dispatch: Dispatch<any> = useDispatch();

  useEffect(() => {
    dispatch(autoLogin());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <>
        <NavBar />
        <Routes>
          {user ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/likedmemories" element={<LikedMemories />} />
              <Route path="/post/:postId" element={<PostDetails />} />
              <Route path="/myPosts" element={<MyPosts />} />
              <Route path="myProfile" element={<Profile />} />
              {size.width && size.width <= 900 && (
                <Route path="/addnewmemory" element={<PostNewMemory />} />
              )}{" "}
            </>
          ) : (
            <>
              <Route path="/" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/forgotpassword" element={<ForgotPassword />} />
            </>
          )}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </>
    </ThemeProvider>
  );
}

export default App;
