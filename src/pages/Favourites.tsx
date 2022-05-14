import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import Error from "../components/Error";
import Loading from "../components/Loading";

import MemoryCard from "../components/MemoryCard";
import { USER_ID } from "../mock/data";
import { getLikedMemories } from "../store/actions/postsActions";
import { useAppSelector } from "../store/store";
import { Memory } from "../types/types";

const Favourites = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const { favMemories, favMemoryError, favMemoryLoading } = useAppSelector(
    (state) => state.posts
  );

  useEffect(() => {
    dispatch(getLikedMemories(USER_ID, "FavUsers"));
  }, []);

  if (favMemoryLoading) {
    return <Loading />;
  }

  if (favMemoryError) {
    return (
      <Error
        message={favMemoryError.message}
        retryHandleClick={() => dispatch(getLikedMemories(USER_ID, "FavUsers"))}
      />
    );
  }

  if (favMemories.length === 0) {
    return (
      <Error message="Make posts favourite to see it here." severity="info" />
    );
  }
  return (
    <Grid container spacing={2} rowSpacing={4} sx={{ p: 3 }}>
      {favMemories.map((el: Memory) => (
        <MemoryCard key={el._id} memory={el} />
      ))}
    </Grid>
  );
};

export default Favourites;
