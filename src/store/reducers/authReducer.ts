import { AnyAction } from "redux";

import { AuthState } from "../../types/types";

const initialState: AuthState = {
  loading: false,
  user: null,
  error: null,
};

export const authReducer = (state = initialState, action: AnyAction) => {
  return state;
};
