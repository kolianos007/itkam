import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk"
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import {reducer as formReducer} from 'redux-form'
import appReducer from "./app-reducer";

const rootReducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  form: formReducer,
  app: appReducer
});

type RootReducerType = typeof rootReducers;
export type AppStateType = ReturnType<RootReducerType>

const store = createStore(rootReducers, applyMiddleware(thunkMiddleware));
// @ts-ignore
window.store = store

export default store;
