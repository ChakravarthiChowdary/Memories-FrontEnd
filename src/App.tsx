import React from "react";
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

  return (
    <ThemeProvider theme={theme}>
      <>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/likedmemories" element={<LikedMemories />} />
          <Route path="/post/:postId" element={<PostDetails />} />
          <Route path="*" element={<PageNotFound />} />
          {size.width && size.width <= 900 && (
            <Route path="/addnewmemory" element={<PostNewMemory />} />
          )}
        </Routes>
      </>
    </ThemeProvider>
  );
}

export default App;
