import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import Error from "../components/Error";
import Loading from "../components/Loading";

import MemoryCard from "../components/MemoryCard";
import { getLikedMemories } from "../store/actions/postsActions";
import { useAppSelector } from "../store/store";
import { Memory } from "../types/types";

const Favourites = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const {
    favMemories,
    favMemoryError,
    favMemoryLoading,
    location,
    searchText,
  } = useAppSelector((state) => state.posts);
  const user = useAppSelector((state) => state.auth.user);

  useEffect(() => {
    dispatch(getLikedMemories(user.id, "FavUsers"));
  }, []);

  if (favMemoryLoading) {
    return <Loading />;
  }

  if (favMemoryError) {
    return (
      <Error
        message={favMemoryError.message}
        retryHandleClick={() => dispatch(getLikedMemories(user.id, "FavUsers"))}
      />
    );
  }

  if (favMemories.length === 0) {
    return (
      <Error message="Make posts favourite to see it here." severity="info" />
    );
  }

  let filteredMemories;

  if (location === "/favourites") {
    filteredMemories = favMemories.filter(
      (memory: Memory) =>
        memory.title.toLowerCase().includes(searchText.toLowerCase()) ||
        memory.title.toLowerCase().includes(searchText.toLowerCase())
    );
  } else filteredMemories = favMemories;

  if (filteredMemories.length === 0) {
    return <Error message="No posts found with search." severity="info" />;
  }

  return (
    <Grid container spacing={2} rowSpacing={4} sx={{ p: 3 }}>
      {filteredMemories.map((el: Memory) => (
        <MemoryCard key={el._id} memory={el} />
      ))}
    </Grid>
  );
};

export default Favourites;
