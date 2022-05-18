import { AnyAction } from "redux";
import { ThunkAction } from "redux-thunk";
import { User } from "../../types/types";
import { RootState } from "../store";

export const AUTH_UPDATE_PROFILE_START = "AUTH_UPDATE_PROFILE_START";
export const AUTH_UPDATE_PROFILE_SUCCESS = "AUTH_UPDATE_PROFILE_SUCCESS";
export const AUTH_UPDATE_PROFILE_FAIL = "AUTH_UPDATE_PROFILE_FAIL";

export const AUTH_SIGNIN_START = "AUTH_SIGNIN_START";
export const AUTH_SIGNIN_SUCCESS = "AUTH_SIGNIN_SUCCESS";
export const AUTH_SIGNIN_FAIL = "AUTH_SIGNIN_FAIL";

export const AUTH_SIGNOUT = "AUTH_SIGNOUT";

export const AUTH_CLEAN_UPDATE_PROFILE_STATE =
  "AUTH_CLEAN_UPDATE_PROFILE_STATE";

export const AUTH_AUTOLOGIN_START = "AUTH_AUTOLOGIN_START";
export const AUTH_AUTOLOGIN_SUCCESS = "AUTH_AUTOLOGIN_SUCCESS";
export const AUTH_AUTOLOGIN_FAIL = "AUTH_AUTOLOGIN_FAIL";

export const AUTH_SIGNUP_START = "AUTH_SIGNUP_START";
export const AUTH_SIGNUP_SUCCESS = "AUTH_SIGNUP_SUCCESS";
export const AUTH_SIGNUP_FAIL = "AUTH_SIGNUP_FAIL";

export const CLEAN_UP_AUTH_STATE = "CLEAN_UP_AUTH_STATE";

export const updateProfile = (userDetails: {
  username: string;
  passwordUpdated: boolean;
  password: string;
  confirmPassword: string;
  id: string;
}): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch, getState) => {
    try {
      const user = getState().auth.user;
      dispatch({ type: AUTH_UPDATE_PROFILE_START });
      const response = await fetch(
        "http://localhost:5000/app/v1/auth/updateProfile",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
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
      localStorage.setItem("user", JSON.stringify(result.userInfo));
      dispatch({ type: AUTH_SIGNIN_SUCCESS, payload: result.userInfo });
    } catch (error) {
      dispatch({ type: AUTH_SIGNIN_FAIL, payload: error });
    }
  };
};

export const autoLogin = (): ThunkAction<
  void,
  RootState,
  unknown,
  AnyAction
> => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_AUTOLOGIN_START });
      let user = localStorage.getItem("user");
      if (user) {
        const userInfo: User = await JSON.parse(user);

        const currentDate = new Date();
        const expiryDate = new Date(userInfo.expiresIn);

        if (expiryDate < currentDate) {
          dispatch({ type: AUTH_AUTOLOGIN_FAIL });
          return;
        }

        dispatch({ type: AUTH_AUTOLOGIN_SUCCESS, payload: userInfo });
      } else {
        dispatch({ type: AUTH_AUTOLOGIN_FAIL });
      }
    } catch (error) {
      dispatch({ type: AUTH_AUTOLOGIN_FAIL, payload: error });
    }
  };
};

export const signUp = (userInfo: {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  photoUrl: string;
}): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async (dispatch) => {
    try {
      dispatch({ type: AUTH_SIGNUP_START });

      const response = await fetch("http://localhost:5000/app/v1/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });
      const result = await response.json();
      if (result.errors || result.error) {
        dispatch({
          type: AUTH_SIGNUP_FAIL,
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

      dispatch({ type: AUTH_SIGNUP_SUCCESS, payload: result });
    } catch (error) {
      dispatch({ type: AUTH_SIGNUP_FAIL, payload: error });
    }
  };
};
