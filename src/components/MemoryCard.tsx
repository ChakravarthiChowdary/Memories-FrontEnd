import { memo, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Badge, Button, Grid } from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { Memory } from "../types/types";
import { useLocation, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { likeOrDislikeMemory } from "../store/actions/postsActions";
import { Dispatch } from "redux";
import { useAppSelector } from "../store/store";

interface IMemoryProps {
  memory: Memory;
}

const MemoryCard: React.FC<IMemoryProps> = ({ memory }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    likedMemories,
    likedMemoryError,
    likedMemoryLoading,
    favMemories,
    favMemoryError,
    favMemoryLoading,
  } = useAppSelector((state) => state.posts);
  const [likesCount, setLikesCount] = useState(memory.likes);
  const [favCount, setFavCount] = useState(memory.favCount);
  const dispatch: Dispatch<any> = useDispatch();
  const { title, description, createdDate, userPhoto, photoUrls, _id } = memory;

  const date = new Date(createdDate);

  const convertedDate = `
    ${date.toLocaleString("default", {
      month: "long",
    })} ${date.getDate()}, ${date.getFullYear()}`;

  const displayLikesBadgeColor = () => {
    return (
      likedMemories.findIndex((lm: Memory) => lm._id === _id) > -1 &&
      !likedMemoryLoading &&
      !likedMemoryError
    );
  };

  const displayFavBadgeColor = () => {
    return (
      favMemories.findIndex((lm: Memory) => lm._id === _id) > -1 &&
      !favMemoryError &&
      !favMemoryLoading
    );
  };

  const likeClickedHandler = () => {
    dispatch(likeOrDislikeMemory(_id, "LikedUsers"));
    if (displayLikesBadgeColor()) {
      setLikesCount((prevState: number) => prevState - 1);
    } else {
      setLikesCount((prevState: number) => prevState + 1);
    }
  };

  const favClickedHandler = () => {
    dispatch(likeOrDislikeMemory(_id, "FavUsers"));
    if (displayFavBadgeColor()) {
      setFavCount((prevState: number) => prevState - 1);
    } else {
      setFavCount((prevState: number) => prevState + 1);
    }
  };

  return (
    <Grid item xs={12} sm={6} md={3}>
      <Card sx={{ maxWidth: 365 }}>
        <CardHeader
          avatar={
            <Avatar
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
              src={userPhoto}
            >
              R
            </Avatar>
          }
          title={title}
          subheader={convertedDate}
          titleTypographyProps={{ fontFamily: "poppins" }}
          subheaderTypographyProps={{ fontFamily: "poppins" }}
        />
        <CardMedia
          component="img"
          height="194"
          alt="Paella dish"
          src={photoUrls[0]}
        ></CardMedia>

        <CardContent>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ fontFamily: "poppins" }}
          >
            {description}
          </Typography>
        </CardContent>
        <CardActions
          disableSpacing
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            flex: 1,
          }}
        >
          <IconButton
            aria-label="add to liked memories"
            onClick={likeClickedHandler}
          >
            <Badge badgeContent={likesCount} color={"error"} max={999}>
              <ThumbUpIcon
                sx={{
                  color:
                    location.pathname === "/likedmemories" ||
                    displayLikesBadgeColor()
                      ? "red"
                      : "default",
                }}
              />
            </Badge>
          </IconButton>
          <IconButton aria-label="add to favorites" onClick={favClickedHandler}>
            <Badge badgeContent={favCount} color={"error"} max={999}>
              <FavoriteIcon
                sx={{
                  color:
                    location.pathname === "/likedmemories" ||
                    displayFavBadgeColor()
                      ? "red"
                      : "default",
                }}
              />
            </Badge>
          </IconButton>
          <Button
            sx={{ fontFamily: "poppins" }}
            onClick={() => {
              navigate(`/post/${_id}`);
            }}
          >
            View
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default memo(MemoryCard);
