import { Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Dispatch } from "redux";
import Error from "../components/Error";
import Loading from "../components/Loading";
import { images, memories } from "../mock/data";
import { getMemoryDetails } from "../store/actions/postsActions";
import { useAppSelector } from "../store/store";

const PostDetails = () => {
  const params = useParams<{ postId: string }>();
  const [index, setIndex] = useState(0);
  const dispatch: Dispatch<any> = useDispatch();
  const { memoryLoading, memory, memoryError } = useAppSelector(
    (state) => state.posts
  );

  const handleSelect = (selectedIndex: number) => {
    setIndex(selectedIndex);
  };

  useEffect(() => {
    if (params.postId) dispatch(getMemoryDetails(params.postId));
  }, []);

  if (memoryLoading || !memory) {
    return <Loading />;
  }

  if (memoryError) {
    return (
      <Error
        message={memoryError.message}
        retryHandleClick={() => {
          if (params.postId) dispatch(getMemoryDetails(params.postId));
        }}
      />
    );
  }

  return (
    <Container
      sx={{
        paddingTop: 2,
      }}
    >
      <Carousel
        activeIndex={index}
        onSelect={handleSelect}
        className="postdetails_carousel_container"
      >
        {memory.photoUrls.map((image: string) => (
          <Carousel.Item className="bg-dark" key={image}>
            <img
              className="d-block w-100 postdetails_image"
              src={image}
              alt="First slide"
            />
            <Carousel.Caption style={{ backgroundColor: "rgba(0,0,0,0.7)" }}>
              <h3>{memory.title}</h3>
              <p>{memory.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default PostDetails;
