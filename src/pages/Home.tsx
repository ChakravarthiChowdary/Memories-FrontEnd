import React, { Dispatch, useEffect } from "react";

import { Grid } from "@mui/material";
import MemoryCard from "../components/MemoryCard";
import PostMemoryForm from "../components/PostMemoryForm";
import useWindowSize from "../hooks/useWindowSize";
import { getAllMemories } from "../store/actions/postsActions";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../store/store";
import { Memory } from "../types/types";
import Loading from "../components/Loading";
import Error from "../components/Error";

function Home() {
  const size = useWindowSize();
  const dispatch: Dispatch<any> = useDispatch();
  const { memories, loading, error } = useAppSelector((state) => state.posts);

  useEffect(() => {
    dispatch(getAllMemories());
  }, []);

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

  return (
    <Grid container spacing={2} sx={{ p: 3 }}>
      <Grid item xs={12} sm={12} md={9}>
        <Grid container spacing={2} rowSpacing={4}>
          {memories.map((memory: Memory) => (
            <MemoryCard key={memory._id} memory={memory} />
          ))}
        </Grid>
      </Grid>
      {size.width && size.width >= 900 && (
        <Grid item xs={12} sm={6} md={3}>
          <PostMemoryForm />
        </Grid>
      )}
    </Grid>
  );
}

export default Home;
