import React, { Dispatch, useEffect } from "react";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";

import { memories, USER_ID } from "../mock/data";
import MemoryCard from "../components/MemoryCard";
import { getLikedMemories } from "../store/actions/postsActions";
import { useAppSelector } from "../store/store";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { Memory } from "../types/types";

const LikedMemories = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const {
    likedMemories,
    likedMemoryError,
    likedMemoryLoading,
    location,
    searchText,
  } = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getLikedMemories(USER_ID, "LikedUsers"));
  }, []);

  if (likedMemoryLoading) {
    return <Loading />;
  }

  if (likedMemoryError) {
    return (
      <Error
        message={likedMemoryError.message}
        retryHandleClick={() =>
          dispatch(getLikedMemories(USER_ID, "LikedUsers"))
        }
      />
    );
  }

  if (likedMemories.length === 0) {
    return <Error message="Like posts to see it here." severity="info" />;
  }

  let filteredMemories;

  if (location === "/likedmemories") {
    filteredMemories = likedMemories.filter(
      (memory: Memory) =>
        memory.title.toLowerCase().includes(searchText.toLowerCase()) ||
        memory.title.toLowerCase().includes(searchText.toLowerCase())
    );
  } else filteredMemories = likedMemories;

  if (filteredMemories.length === 0) {
    return <Error message="No posts found with search." severity="info" />;
  }

  return (
    <Grid container spacing={2} rowSpacing={4} sx={{ p: 3 }}>
      {filteredMemories.map((memory: Memory) => (
        <MemoryCard memory={memory} key={memory._id} />
      ))}
    </Grid>
  );
};

export default LikedMemories;
