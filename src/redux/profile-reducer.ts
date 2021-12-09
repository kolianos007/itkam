import axios from "axios";
import { profileApi, usersApi } from "../api/api";
import { ProfileType } from "../types/types";

const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_STATUS = "SET_STATUS"

let initialState = {
  posts: [
    { id: 1, message: "hi, how are you", likesCount: 12 },
    { id: 2, message: "It's my first post", likesCount: 11 },
  ],
  userProfile: null as ProfileType | null,
  status: ''
};

export type InitialStateType = typeof initialState

const profileReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case ADD_POST:
      let newPost = {
        id: 3,
        message: action.newPostText,
        likesCount: 22,
      };
      return {
        ...state,
        posts: [...state.posts, newPost]
      }
    case SET_USER_PROFILE:
      return {
          ...state,
          userProfile: action.profile
      }
    case SET_STATUS:
      return {
        ...state, 
        status: action.status
      }
    default:
      return state;
  }
};

type AddPostActionCreatorType = {
  type: typeof ADD_POST,
  newPostText: string
}
export let addPostActionCreator = (newPostText: string): AddPostActionCreatorType => ({
  type: ADD_POST,
  newPostText
});

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE,
  profile: ProfileType
}
export let setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({
  type: SET_USER_PROFILE,
  profile
})

type SetStatusActionType = {
  type: typeof SET_STATUS,
  status: string
}
export const setStatus = (status: string): SetStatusActionType => ({
  type: SET_STATUS,
  status
})

//thunk-creator
export const getUserProfile = (userId:number) => {
  return (dispatch:any) => {
      usersApi.getProfile(userId).then((data) => {
        dispatch(setUserProfile(data))
      }
    )
  }
}

export const getStatus = (userId:number) => {
  return (dispatch:any) => {
    profileApi.getStatus(userId).then((response) => {
      dispatch(setStatus(response.data))
    })
  }
}

export const updateStatus = (status:string) => {
  return (dispatch:any) => {
    profileApi.updateStatus(status).then((response) => {
      if(response.data.resultCode === 0) {
        dispatch(setStatus(response.data.status))
      }
    })
  }
}

export default profileReducer;
