import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { JWT } from "../../mock/data";
import { RootState } from "../store";

export const AUTH_UPDATE_PROFILE_START = "AUTH_UPDATE_PROFILE_START";
export const AUTH_UPDATE_PROFILE_SUCCESS = "AUTH_UPDATE_PROFILE_SUCCESS";
export const AUTH_UPDATE_PROFILE_FAIL = "AUTH_UPDATE_PROFILE_FAIL";

export const AUTH_SIGNIN_START = "AUTH_SIGNIN_START";
export const AUTH_SIGNIN_SUCCESS = "AUTH_SIGNIN_SUCCESS";
export const AUTH_SIGNIN_FAIL = "AUTH_SIGNIN_FAIL";

export const AUTH_CLEAN_UPDATE_PROFILE_STATE =
  "AUTH_CLEAN_UPDATE_PROFILE_STATE";

export const updateProfile = (userDetails: {
  username: string;
  passwordUpdated: boolean;
  password: string;
  confirmPassword: string;
  id: string;
}): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_UPDATE_PROFILE_START });
      const response = await fetch(
        "http://localhost:5000/app/v1/auth/updateProfile",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT}`,
          },
          body: JSON.stringify(userDetails),
        }
      );
      const result = await response.json();

      if (result.errors || result.error) {
        dispatch({
          type: AUTH_UPDATE_PROFILE_FAIL,
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

      dispatch({ type: AUTH_UPDATE_PROFILE_SUCCESS, payload: userDetails });
    } catch (error) {
      dispatch({ type: AUTH_UPDATE_PROFILE_FAIL, payload: error });
    }
  };
};

export const signInUser = (credentials: {
  email: string;
  password: string;
}): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_SIGNIN_START });
      const response = await fetch("http://localhost:5000/app/v1/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const result = await response.json();
      if (result.errors || result.error) {
        dispatch({
          type: AUTH_SIGNIN_FAIL,
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
      dispatch({ type: AUTH_SIGNIN_SUCCESS, payload: result });
    } catch (error) {
      dispatch({ type: AUTH_SIGNIN_FAIL, payload: error });
    }
  };
};
