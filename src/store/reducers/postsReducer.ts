import { AnyAction } from "redux";
import { PostState } from "../../types/types";
import {
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
    default:
      return state;
  }
};
