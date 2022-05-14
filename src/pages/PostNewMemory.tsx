import { Container } from "@mui/material";
import React from "react";
import PostMemoryForm from "../components/PostMemoryForm";

const PostNewMemory = () => {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <PostMemoryForm />
    </Container>
  );
};

export default PostNewMemory;
