import { AnyAction } from "redux";

import { AuthState } from "../../types/types";
import {
  AUTH_CLEAN_UPDATE_PROFILE_STATE,
  AUTH_UPDATE_PROFILE_FAIL,
  AUTH_UPDATE_PROFILE_START,
  AUTH_UPDATE_PROFILE_SUCCESS,
} from "../actions/authActions";

const initialState: AuthState = {
  loading: false,
  user: {
    username: "Chakravarthi Katragadda",
    id: "6278ba33d14a7c39382b5393",
    email: "test@test.com",
    photoUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJpZCI6IjYyNzhiYTMzZDE0YTdjMzkzODJiNTM5MyIsInVzZXJuYW1lIjoiQ2hha3JhdmFydGhpIEthdHJhZ2FkZGEiLCJwaG90b1VybCI6Imh0dHBzOi8vaW1hZ2VzLnVuc3BsYXNoLmNvbS9waG90by0xNTM1NzEzODc1MDAyLWQxZDBjZjM3N2ZkZT9peGxpYj1yYi0xLjIuMSZpeGlkPU1ud3hNakEzZkRCOE1IeHdhRzkwYnkxd1lXZGxmSHg4ZkdWdWZEQjhmSHg4JmF1dG89Zm9ybWF0JmZpdD1jcm9wJnc9NTgwJnE9ODAiLCJpYXQiOjE2NTI2NzI5NDcsImV4cCI6MTY1MjY3NjU0N30.yMQbaACFRujEURsH7SNIa2paW6-kw6CKcsqivtBVQFc",
  },
  error: null,
  updateProfileError: null,
  updateProfileLoading: false,
  updateProfileSuccess: false,
};

export const authReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case AUTH_UPDATE_PROFILE_START:
      return {
        ...state,
        updateProfileLoading: true,
        updateProfileError: null,
      };
    case AUTH_UPDATE_PROFILE_FAIL:
      return {
        ...state,
        updateProfileLoading: false,
        updateProfileError: action.payload,
      };
    case AUTH_UPDATE_PROFILE_SUCCESS:
      return {
        ...state,
        updateProfileLoading: false,
        updateProfileError: null,
        updateProfileSuccess: true,
      };
    case AUTH_CLEAN_UPDATE_PROFILE_STATE:
      return {
        ...state,
        updateProfileLoading: false,
        updateProfileError: null,
        updateProfileSuccess: false,
      };
    default:
      return state;
  }
};
