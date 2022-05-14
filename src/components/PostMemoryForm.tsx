import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import NoteAltIcon from "@mui/icons-material/NoteAlt";

import { Avatar, Box, Button, Paper, TextField } from "@mui/material";

const Input = styled("input")({
  display: "none",
});

const PostMemoryForm = () => {
  const [fileNames, setFileNames] = useState<File[]>([]);

  const handleUploadClick = (event: any) => {
    setFileNames(Array.from(event.target.files));
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
      <TextField required label="Title" fullWidth size="small" sx={{ mb: 4 }} />
      <TextField
        required
        label="Description"
        fullWidth
        size="small"
        sx={{ mb: 4 }}
        multiline
        rows={4}
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
      <Button variant="contained" fullWidth>
        Post your memory
      </Button>
    </Paper>
  );
};

export default PostMemoryForm;
