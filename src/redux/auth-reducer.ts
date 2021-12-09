import { stopSubmit } from "redux-form";
import { authApi } from "../api/api";

const SET_AUTH_USER_DATA = "SET_AUTH_USER_DATA";

let initialState = {
  id: null as number | null,
  login: null as string | null,
  email: null as string | null,
  isAuth: false,
};

export type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SET_AUTH_USER_DATA:
      return {
        ...state,
        ...action.data,
      };
    default:
      return state;
  }
};

type SetAuthUserDataActionPayloadType = {
 id: number | null,
 email: string | null, 
 login: string | null, 
 isAuth: boolean 
}

type SetAuthUserDataActionType = {
  type: typeof SET_AUTH_USER_DATA,
  payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (id: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
  type: SET_AUTH_USER_DATA,
  payload: { id, email, login, isAuth },
});

//thunk-creator
export const getAuthUserData = () => (dispatch: any) => {
  return authApi.me().then((data) => {
    if (data.resultCode === 0) {
      const { id, login, email } = data.data;
      dispatch(setAuthUserData(id, email, login, true));
    }
  });
};

export const login = (email: string, password: string, rememberMe: boolean) => (dispatch: any) => {
  authApi.login(email, password, rememberMe).then((data) => {
    if (data.resultCode === 0) {
      dispatch(getAuthUserData());
    } else {
      const message =
        data.messages.length > 0 ? data.messages[0] : "Some error";
      dispatch(stopSubmit("login", { _error: message }));
    }
  });
};

export const logout = () => (dispatch: any) => {
  authApi.logout().then((data) => {
    if (data.resultCode === 0) {
      dispatch(setAuthUserData(null, null, null, false));
    }
  });
};

export default authReducer;
