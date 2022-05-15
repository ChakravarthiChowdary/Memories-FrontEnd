import React, { Dispatch, useEffect, useState } from "react";

import { Grid, Snackbar } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MemoryCard from "../components/MemoryCard";
import PostMemoryForm from "../components/PostMemoryForm";
import useWindowSize from "../hooks/useWindowSize";
import {
  CLEAN_UP_POST_MEMORY_STATE,
  getAllMemories,
} from "../store/actions/postsActions";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/store";
import { Memory } from "../types/types";
import Loading from "../components/Loading";
import Error from "../components/Error";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Home() {
  const size = useWindowSize();
  const dispatch: Dispatch<any> = useDispatch();
  const {
    memories,
    loading,
    error,
    postMemoryError,
    postMemorySuccess,
    location,
    searchText,
  } = useAppSelector((state) => state.posts);
  const [open, setOpen] = useState(false);

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
    dispatch({ type: CLEAN_UP_POST_MEMORY_STATE });
  };

  useEffect(() => {
    dispatch(getAllMemories());
  }, []);

  useEffect(() => {
    if (postMemoryError) {
      setOpen(true);
    }
  }, [postMemoryError]);

  useEffect(() => {
    if (postMemorySuccess) {
      setOpen(true);
    }
  }, [postMemorySuccess]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <Error
        message={error.message}
        retryHandleClick={() => dispatch(getAllMemories())}
      />
    );
  }

  let filteredMemories;

  if (location === "/") {
    filteredMemories = memories.filter(
      (memory: Memory) =>
        memory.title.toLowerCase().includes(searchText.toLowerCase()) ||
        memory.title.toLowerCase().includes(searchText.toLowerCase())
    );
  } else filteredMemories = memories;

  return (
    <>
      <Grid container spacing={2} sx={{ p: 3 }}>
        <Grid item xs={12} sm={12} md={9}>
          <Grid container spacing={2} rowSpacing={4}>
            {filteredMemories.length > 0 ? (
              filteredMemories.map((memory: Memory) => (
                <MemoryCard key={memory._id} memory={memory} />
              ))
            ) : (
              <Error message="No posts found with search." severity="info" />
            )}
          </Grid>
        </Grid>
        {size.width && size.width >= 900 && (
          <Grid item xs={12} sm={6} md={3}>
            <PostMemoryForm />
          </Grid>
        )}
      </Grid>
      {postMemoryError && (
        <Snackbar
          open={open}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          autoHideDuration={3000}
          onClose={handleClose}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            {postMemoryError.message
              ? postMemoryError.message
              : "Unknown error occurred."}
          </Alert>
        </Snackbar>
      )}
    </>
  );
}

export default Home;
