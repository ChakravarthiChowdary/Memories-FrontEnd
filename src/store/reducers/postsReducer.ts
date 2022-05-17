import { AnyAction } from "redux";
import { PostState } from "../../types/types";
import {
  CLEAN_UP_POST_MEMORY_STATE,
  CLEAN_UP_SEARCH_STATE,
  GET_ALL_MEMORIES_FAIL,
  GET_ALL_MEMORIES_START,
  GET_ALL_MEMORIES_SUCCESS,
  GET_FAV_MEMORIES_FAIL,
  GET_FAV_MEMORIES_START,
  GET_FAV_MEMORIES_SUCCESS,
  GET_LIKED_MEMORIES_FAIL,
  GET_LIKED_MEMORIES_START,
  GET_LIKED_MEMORIES_SUCCESS,
  GET_MEMORY_DETAIL_FAIL,
  GET_MEMORY_DETAIL_START,
  GET_MEMORY_DETAIL_SUCCESS,
  GET_MY_POSTS_FAIL,
  GET_MY_POSTS_START,
  GET_MY_POSTS_SUCCESS,
  POST_MEMORY_FAIL,
  POST_MEMORY_START,
  POST_MEMORY_SUCCESS,
  SEARCH_POSTS,
} from "../actions/postsActions";

const initialState: PostState = {
  loading: false,
  error: null,
  memories: [],
  memory: null,
  memoryLoading: false,
  memoryError: null,
  likedMemoryError: null,
  likedMemories: [],
  likedMemoryLoading: false,
  favMemories: [],
  favMemoryError: null,
  favMemoryLoading: false,
  postMemoryLoading: false,
  postMemoryError: null,
  postMemorySuccess: false,
  location: "",
  searchText: "",
  myPosts: [],
  myPostsLoading: false,
  myPostsError: null,
};

export const postReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case GET_ALL_MEMORIES_START:
      return { ...state, loading: true, error: null };
    case GET_ALL_MEMORIES_SUCCESS:
      return {
        ...state,
        loading: false,
        memories: action.payload.posts,
        error: null,
      };
    case GET_ALL_MEMORIES_FAIL:
      return { ...state, loading: false, memories: [], error: action.payload };
    case GET_MEMORY_DETAIL_START:
      return { ...state, memoryLoading: true, memoryError: null };
    case GET_MEMORY_DETAIL_SUCCESS:
      return {
        ...state,
        memoryLoading: false,
        memory: action.payload,
        memoryError: null,
      };
    case GET_MEMORY_DETAIL_FAIL:
      return {
        ...state,
        memoryLoading: false,
        memories: [],
        memoryError: action.payload,
      };
    case GET_LIKED_MEMORIES_START:
      return {
        ...state,
        likedMemoryLoading: true,
        likedMemoryError: null,
      };
    case GET_LIKED_MEMORIES_SUCCESS:
      return {
        ...state,
        likedMemoryLoading: false,
        likedMemoryError: null,
        likedMemories: action.payload.likedPosts,
      };
    case GET_LIKED_MEMORIES_FAIL:
      return {
        ...state,
        likedMemoryLoading: false,
        likedMemoryError: action.payload,
        likedMemories: [],
      };
    case GET_FAV_MEMORIES_START:
      return {
        ...state,
        favMemoryLoading: true,
        favMemoryError: null,
      };
    case GET_FAV_MEMORIES_SUCCESS:
      return {
        ...state,
        favMemoryLoading: false,
        favMemoryError: null,
        favMemories: action.payload.favPosts,
      };
    case GET_FAV_MEMORIES_FAIL:
      return {
        ...state,
        favMemoryLoading: false,
        favMemoryError: action.payload,
        favMemories: [],
      };
    case POST_MEMORY_START:
      return {
        ...state,
        postMemoryLoading: true,
        postMemoryError: null,
      };
    case POST_MEMORY_FAIL:
      return {
        ...state,
        postMemoryLoading: false,
        postMemoryError: action.payload,
      };
    case POST_MEMORY_SUCCESS:
      const updatedMemories = state.memories;
      updatedMemories.push(action.payload);
      return {
        ...state,
        postMemoryLoading: false,
        postMemoryError: null,
        postMemorySuccess: true,
        memories: updatedMemories,
      };
    case CLEAN_UP_POST_MEMORY_STATE:
      return {
        ...state,
        postMemoryLoading: false,
        postMemoryError: null,
        postMemorySuccess: false,
      };
    case SEARCH_POSTS:
      const { location, searchText } = action.payload;
      return {
        ...state,
        location,
        searchText,
      };
    case CLEAN_UP_SEARCH_STATE:
      return {
        ...state,
        location: "",
        searchText: "",
      };
    case GET_MY_POSTS_START:
      return {
        ...state,
        myPostsLoading: true,
        myPostsError: null,
      };
    case GET_MY_POSTS_SUCCESS:
      return {
        ...state,
        myPostsLoading: false,
        myPostsError: null,
        myPosts: action.payload,
      };
    case GET_MY_POSTS_FAIL:
      return {
        ...state,
        myPostsLoading: false,
        myPostsError: action.payload,
      };
    default:
      return state;
  }
};
