import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { JWT, USER_ID } from "../../mock/data";
import { RootState } from "../store";

export const GET_ALL_MEMORIES_START = "GET_ALL_MEMORIES_START";
export const GET_ALL_MEMORIES_SUCCESS = "GET_ALL_MEMORIES_SUCCESS";
export const GET_ALL_MEMORIES_FAIL = "GET_ALL_MEMORIES_FAIL";

export const GET_MEMORY_DETAIL_START = "GET_MEMORY_DETAIL_START";
export const GET_MEMORY_DETAIL_SUCCESS = "GET_MEMORY_DETAIL_SUCCESS";
export const GET_MEMORY_DETAIL_FAIL = "GET_MEMORY_DETAIL_FAIL";

export const LIKE_MEMORY_FAIL = "LIKE_MEMORY_FAIL";

export const GET_LIKED_MEMORIES_START = "GET_LIKED_MEMORIES_START";
export const GET_LIKED_MEMORIES_SUCCESS = "GET_LIKED_MEMORIES_SUCCESS";
export const GET_LIKED_MEMORIES_FAIL = "GET_LIKED_MEMORIES_FAIL";

export const GET_FAV_MEMORIES_START = "GET_FAV_MEMORIES_START";
export const GET_FAV_MEMORIES_SUCCESS = "GET_FAV_MEMORIES_SUCCESS";
export const GET_FAV_MEMORIES_FAIL = "GET_FAV_MEMORIES_FAIL";

export const POST_MEMORY_START = "POST_MEMORY_START";
export const POST_MEMORY_SUCCESS = "POST_MEMORY_SUCCESS";
export const POST_MEMORY_FAIL = "POST_MEMORY_FAIL";

export const CLEAN_UP_POST_MEMORY_STATE = "CLEAN_UP_POST_MEMORY_STATE";
export const SEARCH_POSTS = "SEARCH_POSTS";
export const CLEAN_UP_SEARCH_STATE = "CLEAN_UP_SEARCH_STATE";

const getRequestParams = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${JWT}`,
  },
};

const postRequestParams = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${JWT}`,
  },
};

export const getAllMemories = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_ALL_MEMORIES_START });

      const response = await fetch(
        "http://localhost:5000/app/v1/posts",
        getRequestParams
      );
      const result = await response.json();

      if (result.errors || result.error) {
        dispatch({
          type: GET_ALL_MEMORIES_FAIL,
          payload: result.errors
            ? {
                message: result.errors[0].msg,
                statusCode: 500,
                requestStatus: "Fail",
              }
            : result.error,
        });
        return;
      }

      dispatch(getLikedMemories(USER_ID, "LikedUsers", result));
      dispatch(getLikedMemories(USER_ID, "FavUsers", result));
    } catch (error) {
      dispatch({ type: GET_ALL_MEMORIES_FAIL, payload: error });
    }
  };
};

export const getMemoryDetails = (
  id: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_MEMORY_DETAIL_START });

      const response = await fetch(
        `http://localhost:5000/app/v1/posts/${id}`,
        getRequestParams
      );

      const result = await response.json();

      if (result.errors || result.error) {
        dispatch({
          type: GET_MEMORY_DETAIL_FAIL,
          payload: result.errors
            ? {
                message: result.errors[0].msg,
                statusCode: 500,
                requestStatus: "Fail",
              }
            : result.error,
        });
        return;
      }

      dispatch({ type: GET_MEMORY_DETAIL_SUCCESS, payload: result });
    } catch (error) {
      dispatch({ type: GET_MEMORY_DETAIL_FAIL, payload: error });
    }
  };
};

export const likeOrDislikeMemory = (
  postId: string,
  likedOrFav: "LikedUsers" | "FavUsers"
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      const params = {
        ...postRequestParams,
        body: JSON.stringify({ postId: postId, likedOrFav: likedOrFav }),
      };

      const response = await fetch(
        `http://localhost:5000/app/v1/posts/addOrRemoveLikedOrFavUserToPost`,
        params
      );
      const result = await response.json();

      if (result.errors || result.error) {
        dispatch({
          type: LIKE_MEMORY_FAIL,
          payload: result.errors
            ? {
                message: result.errors[0].msg,
                statusCode: 500,
                requestStatus: "Fail",
              }
            : result.error,
        });
        return;
      }

      dispatch(getLikedMemories(USER_ID, likedOrFav));
    } catch (error) {
      dispatch({ type: LIKE_MEMORY_FAIL, payload: error });
    }
  };
};

export const getLikedMemories = (
  userId: string,
  likedOrFav: "LikedUsers" | "FavUsers",
  allMemories?: any
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    const getLiked = likedOrFav === "LikedUsers";

    try {
      if (getLiked) {
        dispatch({ type: GET_LIKED_MEMORIES_START });
      } else {
        dispatch({ type: GET_FAV_MEMORIES_START });
      }

      const response = await fetch(
        `http://localhost:5000/app/v1/posts/getLikedOrFavPostsOfUser/${likedOrFav}/${userId}`,
        getRequestParams
      );
      const result = await response.json();

      if (result.error) {
        if (getLiked) {
          dispatch({ type: GET_LIKED_MEMORIES_FAIL, payload: result.error });
        } else {
          dispatch({ type: GET_FAV_MEMORIES_FAIL, payload: result.error });
        }
        return;
      }
      if (getLiked) {
        dispatch({ type: GET_LIKED_MEMORIES_SUCCESS, payload: result });
      } else {
        dispatch({ type: GET_FAV_MEMORIES_SUCCESS, payload: result });
        if (allMemories) {
          dispatch({ type: GET_ALL_MEMORIES_SUCCESS, payload: allMemories });
        }
      }
    } catch (error) {
      if (getLiked) {
        dispatch({ type: GET_LIKED_MEMORIES_FAIL, payload: error });
      } else {
        dispatch({ type: GET_FAV_MEMORIES_FAIL, payload: error });
      }
    }
  };
};

export const postMemory = (
  title: string,
  description: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      dispatch({ type: POST_MEMORY_START });
      const params = {
        ...postRequestParams,
        body: JSON.stringify({
          title,
          description,
          photoUrls: [
            "https://images.unsplash.com/photo-1650827579122-9e21ec2937dd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDQ3fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1650897466986-db5a61435774?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDQ5fDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
            "https://images.unsplash.com/photo-1651138623181-af9c32af8403?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHx0b3BpYy1mZWVkfDUzfDZzTVZqVExTa2VRfHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
          ],
        }),
      };
      console.log(params);
      const response = await fetch(
        "http://localhost:5000/app/v1/posts",
        params
      );

      const result = await response.json();
      if (result.errors || result.error) {
        dispatch({
          type: POST_MEMORY_FAIL,
          payload: result.errors
            ? {
                message: result.errors[0].msg,
                statusCode: 500,
                requestStatus: "Fail",
              }
            : result.error,
        });
        return;
      }
      dispatch({ type: POST_MEMORY_SUCCESS, payload: result });
    } catch (error) {
      dispatch({ type: POST_MEMORY_FAIL, payload: error });
    }
  };
};
