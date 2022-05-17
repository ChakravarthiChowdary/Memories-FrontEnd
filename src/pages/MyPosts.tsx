import React, { Dispatch, useEffect } from "react";
import { Grid } from "@mui/material";
import { useDispatch } from "react-redux";

import MemoryCard from "../components/MemoryCard";
import { getMyPosts } from "../store/actions/postsActions";
import { useAppSelector } from "../store/store";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { Memory } from "../types/types";

const MyPosts = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const { myPosts, myPostsError, myPostsLoading, location, searchText } =
    useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getMyPosts());
  }, []);

  if (myPostsLoading) {
    return <Loading />;
  }

  if (myPostsError) {
    return (
      <Error
        message={myPostsError.message}
        retryHandleClick={() => dispatch(getMyPosts())}
      />
    );
  }

  if (myPosts.length === 0) {
    return <Error message="Like posts to see it here." severity="info" />;
  }

  let filteredMemories;

  if (location === "/myPosts") {
    filteredMemories = myPosts.filter(
      (memory: Memory) =>
        memory.title.toLowerCase().includes(searchText.toLowerCase()) ||
        memory.title.toLowerCase().includes(searchText.toLowerCase())
    );
  } else filteredMemories = myPosts;

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

export default MyPosts;
