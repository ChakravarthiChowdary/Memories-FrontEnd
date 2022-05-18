import { AnyAction } from "redux";

import { AuthState } from "../../types/types";
import {
  AUTH_CLEAN_UPDATE_PROFILE_STATE,
  AUTH_SIGNIN_FAIL,
  AUTH_SIGNIN_START,
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNOUT,
  AUTH_UPDATE_PROFILE_FAIL,
  AUTH_UPDATE_PROFILE_START,
  AUTH_UPDATE_PROFILE_SUCCESS,
} from "../actions/authActions";

const initialState: AuthState = {
  loading: false,
  user: null,
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
    case AUTH_SIGNIN_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AUTH_SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
      };
    case AUTH_SIGNIN_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case AUTH_SIGNOUT:
      return initialState;
    default:
      return state;
  }
};
