import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import NoteAltIcon from "@mui/icons-material/NoteAlt";

import { Avatar, Box, Button, Paper, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { postMemory } from "../store/actions/postsActions";
import LoadingButton from "@mui/lab/LoadingButton";
import { useAppSelector } from "../store/store";

const Input = styled("input")({
  display: "none",
});

const PostMemoryForm = () => {
  const [fileNames, setFileNames] = useState<File[]>([]);
  const [title, setTitle] = useState("");
  const [titleTouched, setTitleTouched] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionTouched, setDescriptionTouched] = useState(false);
  const dispatch: Dispatch<any> = useDispatch();
  const { postMemoryLoading } = useAppSelector((state) => state.posts);

  const handleUploadClick = (event: any) => {
    setFileNames(Array.from(event.target.files));
  };

  const postButtonClickedHandler = () => {
    if (title !== "" && description !== "") {
      dispatch(postMemory(title, description));
    }
  };

  return (
    <Paper
      sx={{
        p: 3,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginBottom: 3,
        }}
      >
        <Avatar
          sx={{
            m: 1,
            bgcolor: "primary.main",
            textAlign: "center",
          }}
        >
          <NoteAltIcon />
        </Avatar>
      </Box>
      <TextField
        required
        label="Title"
        fullWidth
        size="small"
        sx={{ mb: 4 }}
        onChange={(event) => {
          setTitleTouched(true);
          setTitle(event.target.value);
        }}
        error={title === "" && titleTouched}
        helperText={title === "" && titleTouched && "Title cannot be blank"}
      />
      <TextField
        required
        label="Description"
        fullWidth
        size="small"
        sx={{ mb: 4 }}
        multiline
        rows={4}
        onChange={(event) => {
          setDescriptionTouched(true);
          setDescription(event.target.value);
        }}
        error={description === "" && descriptionTouched}
        helperText={
          description === "" &&
          descriptionTouched &&
          "Description cannot be blank"
        }
      />
      <label htmlFor="contained-button-file">
        <Input
          accept="image/*"
          id="contained-button-file"
          type="file"
          onChange={handleUploadClick}
          multiple
        />
        <Button
          variant="contained"
          component="span"
          sx={{ mb: 4 }}
          color="info"
        >
          Upload
        </Button>
        {fileNames.map((el) => (
          <p>{el.name}</p>
        ))}
      </label>
      <LoadingButton
        color="primary"
        onClick={postButtonClickedHandler}
        loading={postMemoryLoading}
        variant="contained"
        fullWidth
      >
        Post your memory
      </LoadingButton>
    </Paper>
  );
};

export default PostMemoryForm;
