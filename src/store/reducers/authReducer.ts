import { AnyAction } from "redux";

import { AuthState } from "../../types/types";
import {
  AUTH_AUTOLOGIN_FAIL,
  AUTH_AUTOLOGIN_START,
  AUTH_AUTOLOGIN_SUCCESS,
  AUTH_CLEAN_UPDATE_PROFILE_STATE,
  AUTH_SIGNIN_FAIL,
  AUTH_SIGNIN_START,
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNOUT,
  AUTH_SIGNUP_FAIL,
  AUTH_SIGNUP_START,
  AUTH_SIGNUP_SUCCESS,
  AUTH_UPDATE_PROFILE_FAIL,
  AUTH_UPDATE_PROFILE_START,
  AUTH_UPDATE_PROFILE_SUCCESS,
  CLEAN_UP_AUTH_STATE,
} from "../actions/authActions";

const initialState: AuthState = {
  loading: false,
  user: null,
  error: null,
  updateProfileError: null,
  updateProfileLoading: false,
  updateProfileSuccess: false,
  autoLoginLoading: false,
  signUpSuccess: false,
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
      localStorage.removeItem("user");
      return initialState;
    case AUTH_AUTOLOGIN_START:
      return {
        ...state,
        autoLoginLoading: true,
      };
    case AUTH_AUTOLOGIN_FAIL:
      return {
        ...state,
        autoLoginLoading: false,
        user: null,
      };
    case AUTH_AUTOLOGIN_SUCCESS:
      return {
        ...state,
        autoLoginLoading: false,
        user: action.payload,
      };
    case AUTH_SIGNUP_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AUTH_SIGNUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        signUpSuccess: true,
      };
    case AUTH_SIGNUP_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        signUpSuccess: false,
      };
    case CLEAN_UP_AUTH_STATE:
      return initialState;
    default:
      return state;
  }
};
